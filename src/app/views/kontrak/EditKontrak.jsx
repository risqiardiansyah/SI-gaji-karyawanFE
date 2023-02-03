import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { formatHarga, konversiRomawi } from 'app/utils/globalFunction';
import { getSigner } from 'app/redux/actions/SignerActions';
import { SimpleCard } from 'matx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from 'react-material-ui-form-validator';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from 'react-select';
import {
  editInvoice,
  getDetailInvoice,
} from 'app/redux/actions/InvoiceActions';

class EditInvoice extends Component {
  constructor() {
    super();
    this.state = {
      no_invoice: '',
      perihal: '',
      nama_pelanggan: '',
      email: '',
      perusahaan: '',
      telepon: '',
      tanggal_dikirim: '',
      tanggal_jatuh_tempo: '',
      fitur: [
        {
          index: 0,
          nama: '',
          biaya: 0,
        },
      ],
      pembayaran: '',
      catatan: '',
      sub_total: 0,
      submit: 0,
      v_tanggal_dikirim: new Date(),
      v_tanggal_jatuh: new Date(),
      metode: 'a',
      jml_term: 3,
      termin: [],
      total_biaya: 0,
      ppn: 0,
      term1: 0,
      term2: 0,
      term3: 0,
      optionPelanggan: [],
      invoice_code: 0,
      off: false,
    };
  }
  setPage = (page) => {
    this.setState({ page });
  };
  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { getSigner, dataPelanggan, getDetailInvoice } = this.props;
    getSigner();
    getDetailInvoice(id);

    this.setState({
      optionPelanggan: dataPelanggan,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { detailInvoice } = nextProps;

    if (detailInvoice != null && this.state.off == false) {
      this.setState({
        invoice_code: detailInvoice?.invoice_code,
        v_tanggal_jatuh: detailInvoice?.jatuh_tempo_invoice,
        total_biaya: detailInvoice?.jumlah_tagihan,
        catatan: detailInvoice?.keterangan,
        metode: detailInvoice?.model_pembayaran,
        nama_pelanggan: detailInvoice?.pelanggan_code,
        perihal: detailInvoice?.perihal,
        ppn: detailInvoice?.ppn,
        fitur: detailInvoice?.project,
        v_tanggal_dikirim: detailInvoice?.tanggal_invoice,
        termin: detailInvoice?.termin,
        off: true,
        jml_term: detailInvoice?.termin.length,
      });

      if (detailInvoice?.model_pembayaran == 'medium') {
        this.setState({
          term1: detailInvoice?.termin[0].nominal,
          term2: detailInvoice?.termin[1].nominal,
          term3: detailInvoice?.termin[1].nominal,
        });
      }

      if (detailInvoice?.model_pembayaran == 'high') {
        this.setState({
          term1: detailInvoice?.termin[0].nominal,
          term2: detailInvoice?.termin[1].nominal,
        });
      }
    }
  }

  handleChange = (e) => {
    e.persist();
    const { jml_term } = this.state;
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        if (e.target?.name == 'metode') {
          this.handleChangeTerm(jml_term);
        }
      }
    );
  };

  handleChangeTerm = (e) => {
    let { fitur, metode } = this.state;
    let term1, term2, term3;
    let a = e.target?.value || e;
    let value = Number(a);
    let total = 0;
    for (let a = 0; a < fitur.length; a++) {
      total += Number(fitur[a].biaya);
    }
    let ppn = (total * 10) / 100;
    if (metode == 'standar') {
      let dp = (total * 50) / 100;
      let bagi = (total - dp) / (value - 1);
      let termin = [];
      for (let i = 0; i < value; i++) {
        let nominal = i == 0 ? dp : bagi;
        let data = {
          index: i,
          nominal: nominal,
        };
        termin.push(data);
      }
      this.setState({
        jml_term: value,
        dp: value,
        termin: termin,
        total_biaya: total + ppn,
        ppn: ppn,
      });
    } else if (metode == 'medium') {
      term1 = (total * 55) / 100;
      term2 = (total * 35) / 100;
      term3 = (total * 10) / 100;

      this.setState({
        term1: term1,
        term2: term2,
        term3: term3,
        total_biaya: total + ppn,
        ppn: ppn,
      });
    } else if (metode == 'high') {
      term1 = (total * 60) / 100;
      term2 = (total * 40) / 100;

      this.setState({
        term1: term1,
        term2: term2,
        total_biaya: total + ppn,
        ppn: ppn,
      });
    } else {
      this.setState({
        total_biaya: total + ppn,
        ppn: ppn,
      });
    }
  };

  handleChangeItem = (e) => {
    let idx = e.target.id;
    let { fitur, jml_term } = this.state;
    let newFitur = fitur;
    newFitur[idx][e.target.name] = e.target.value;
    this.setState({
      fitur: newFitur,
    });
    this.handleChangeTerm(jml_term);
  };

  submitForm = () => {
    this.setState(
      {
        submit: true,
      },
      this.sendSubmit
    );
  };

  sendSubmit() {
    const {
      nama_pelanggan,
      perihal,
      v_tanggal_dikirim,
      v_tanggal_jatuh,
      catatan,
      fitur,
      metode,
      termin,
      term1,
      term2,
      term3,
      ppn,
      total_biaya,
      invoice_code,
    } = this.state;
    const { editInvoice, history } = this.props;

    let params = {
      perihal: perihal,
      pelanggan_code: nama_pelanggan,
      tgl_dikirim: v_tanggal_dikirim,
      tgl_jatuh_tempo: v_tanggal_jatuh,
      catatan: catatan,
      termin: termin,
      inv_content: fitur,
      model_pembayaran: metode,
      ppn: ppn,
      total_biaya: total_biaya,
      invoice_code: invoice_code,
    };
    if (metode == 'a') {
      Swal.fire({
        title: 'Gagal',
        text: 'Silahkan Pilih Termin',
        timer: 2000,
        icon: 'Warning',
      }).then(() =>
        this.setState({
          submit: false,
        })
      );
    } else if (metode == 'medium') {
      let mediumTermin = [
        {
          nominal: term1,
        },
        {
          nominal: term2,
        },
        {
          nominal: term3,
        },
      ];

      params.termin = mediumTermin;
    } else if (metode == 'high') {
      let highTermin = [
        {
          nominal: term1,
        },
        {
          nominal: term2,
        },
      ];

      params.termin = highTermin;
    } else if (metode == 'excellent') {
      params.termin = [];
    }

    editInvoice(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: 'Berhasil',
            text: 'Data berhasil disimpan',
            timer: 2000,
            icon: 'success',
          }).then(() => {
            history.push('/buat_surat');
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'Gagal',
          text: 'Data gagal disimpan',
          timer: 2000,
          icon: 'error',
        }).then(() =>
          this.setState({
            submit: false,
          })
        );
      });
  }

  handleDateKirimChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal_dikirm: dateFormat,
      v_tanggal_dikirim: event,
    });
  };

  handleDateJatuhChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal_jatuh_tempo: dateFormat,
      v_tanggal_jatuh: event,
    });
  };

  addItem = () => {
    let { fitur } = this.state;
    let data = [
      {
        index: fitur.length + 1,
        nama: '',
        biaya: '',
      },
    ];

    let all = fitur.concat(data);

    this.setState({
      fitur: all,
    });
  };

  deleteItem = (index) => {
    let { fitur } = this.state;
    let newData = fitur.filter((item) => item.index != index);

    this.setState({
      fitur: newData,
    });
  };

  handleChangePelanggan = (val) => {
    this.setState({
      nama_pelanggan: val.value,
    });
  };

  render() {
    const {
      perihal,
      nama_pelanggan,
      email,
      telepon,
      v_tanggal_dikirim,
      v_tanggal_jatuh,
      fitur,
      catatan,
      submit,
      metode,
      jml_term,
      termin,
      total_biaya,
      ppn,
      term1,
      term2,
      term3,
    } = this.state;
    const { dataPelanggan } = this.props;
    return (
      <div className='m-sm-30'>
        <SimpleCard loading={false} title='Tambah Invoice'>
          <ValidatorForm ref='form' onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={nama_pelanggan}
                  name='nama_pelanggan'
                  options={dataPelanggan}
                  onChange={this.handleChangePelanggan}
                  className='basic-multi-select mb-4'
                  placeholder='Nama Pelanggan'
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant='outlined'
                  className='w-full mb-3'
                  label='Perihal'
                  onChange={this.handleChange}
                  type='text'
                  name='perihal'
                  value={perihal}
                  validators={['required']}
                  errorMessages={['Field is Required']}
                />
              </Grid>
            </Grid>
            {/* <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Email"
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={email}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Telepon"
                  onChange={this.handleChange}
                  type="text"
                  name="telepon"
                  value={telepon}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                />
              </Grid>
            </Grid> */}
            {/* <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Perusahaan"
                  onChange={this.handleChange}
                  type="text"
                  name="perusahaan"
                  value={perusahaan}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                />
              </Grid>
            </Grid> */}
            <Grid container spacing={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className='w-full'
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Tanggal Invoice'
                    value={v_tanggal_dikirim}
                    onChange={this.handleDateKirimChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className='w-full'
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Tanggal Jatuh Tempo'
                    value={v_tanggal_jatuh}
                    onChange={this.handleDateJatuhChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant='outlined'
                  className='w-full mb-3'
                  label='Catatan'
                  onChange={this.handleChange}
                  type='text'
                  name='catatan'
                  value={catatan}
                  validators={['required']}
                  errorMessages={['Field is Required']}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Table className='crud-table'>
                  <TableHead className='bg-primary'>
                    <TableRow>
                      <TableCell
                        className='py-2 text-center font-poppins font-bold text-white'
                        align='center'
                        colSpan={5}
                      >
                        Nama Proyek
                      </TableCell>
                      <TableCell
                        className='py-2 text-center font-poppins font-bold text-white'
                        align='center'
                        colSpan={5}
                      >
                        Biaya Proyek
                      </TableCell>
                      <TableCell
                        className='py-2 text-center font-poppins font-bold text-white'
                        align='center'
                        colSpan={1}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className='mt-2'>
                    {fitur.map((item, index) => (
                      <TableRow hover>
                        <TableCell
                          className='font-poppins p-'
                          align='center'
                          colSpan={5}
                        >
                          <TextValidator
                            variant='outlined'
                            className='w-full mb-3'
                            label='Nama Proyek'
                            onChange={this.handleChangeItem}
                            type='text'
                            name='nama'
                            id={index}
                            value={item.nama}
                            validators={['required']}
                            errorMessages={['Field is Required']}
                            // helperText={formatRupiah(saldo, mata_uang)}
                          />
                        </TableCell>
                        <TableCell
                          className='font-poppins p-1'
                          align='center'
                          colSpan={5}
                        >
                          <TextValidator
                            variant='outlined'
                            className='w-full mb-3'
                            label='Biaya Proyek'
                            onChange={this.handleChangeItem}
                            type='number'
                            name='biaya'
                            value={item.biaya}
                            id={index}
                            validators={['required']}
                            errorMessages={['Field is Required']}
                            // helperText={formatRupiah(item.biaya, 'Rp')}
                          />
                        </TableCell>
                        <TableCell
                          className='font-poppins pt-0'
                          align='center'
                          colSpan={1}
                        >
                          <Button
                            variant='contained'
                            className={
                              ' text-white elevation-z0 ' + fitur.length == 1
                                ? ''
                                : 'bg-error'
                            }
                            onClick={() => this.deleteItem(item.index)}
                            disabled={fitur.length == 1 ? true : false}
                          >
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
            <Button
              variant='contained'
              className='bg-secondary text-white elevation-z0 mb-4'
              onClick={this.addItem}
            >
              Tambah Item
            </Button>
            <br />
            <br />
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12} className='mb-3'>
                <SelectValidator
                  variant='outlined'
                  className='mb-4 w-full'
                  label='Pilih Standar Pembayaran'
                  onChange={this.handleChange}
                  name='metode'
                  value={metode || ''}
                >
                  <MenuItem value='a' disabled>
                    <em>Pilih Standar Pembayaran</em>
                  </MenuItem>
                  <MenuItem value='standar'>Standar</MenuItem>
                  <MenuItem value='medium'>Medium</MenuItem>
                  <MenuItem value='high'>High</MenuItem>
                  <MenuItem value='excellent'>Excellent</MenuItem>
                </SelectValidator>
              </Grid>
              {metode == 'standar' ? (
                <Grid item sm={2} xs={12} className='mb-3'>
                  <TextValidator
                    variant='outlined'
                    className='w-full mb-3'
                    label='Jumlah Termin'
                    onChange={this.handleChangeTerm}
                    type='number'
                    name='jml_term'
                    value={jml_term}
                    helperText='Harus lebih dari 2'
                  />
                </Grid>
              ) : (
                ''
              )}
            </Grid>
            {metode == 'standar'
              ? termin.map((item, index) => (
                  <Grid
                    container
                    spacing={2}
                    style={{ justifyContent: 'flex-end', alignItems: 'center' }}
                  >
                    <h4 className='mb-6 mr-3'>
                      {index == 0 ? 'DP' : 'Term ' + konversiRomawi(index)}
                    </h4>
                    <Grid item sm={4} xs={12} className='mb-3'>
                      <TextValidator
                        variant='outlined'
                        className='w-full mb-3'
                        label=''
                        onChange={this.handleChangeItem}
                        type='text'
                        name='term'
                        value={formatHarga(item.nominal)}
                        disabled
                      />
                    </Grid>
                  </Grid>
                ))
              : ''}
            {metode == 'medium' ? (
              <>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: 'flex-end', alignItems: 'center' }}
                >
                  <h4 className='mb-6 mr-3'>Term {konversiRomawi(1)}</h4>
                  <Grid item sm={4} xs={12} className='mb-3'>
                    <TextValidator
                      variant='outlined'
                      className='w-full mb-3'
                      label=''
                      onChange={this.handleChangeItem}
                      type='text'
                      name='term1'
                      value={formatHarga(term1)}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: 'flex-end', alignItems: 'center' }}
                >
                  <h4 className='mb-6 mr-3'>Term {konversiRomawi(2)}</h4>
                  <Grid item sm={4} xs={12} className='mb-3'>
                    <TextValidator
                      variant='outlined'
                      className='w-full mb-3'
                      label=''
                      onChange={this.handleChangeItem}
                      type='text'
                      name='term2'
                      value={formatHarga(term2)}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: 'flex-end', alignItems: 'center' }}
                >
                  <h4 className='mb-6 mr-3'>Term {konversiRomawi(3)}</h4>
                  <Grid item sm={4} xs={12} className='mb-3'>
                    <TextValidator
                      variant='outlined'
                      className='w-full mb-3'
                      label=''
                      onChange={this.handleChangeItem}
                      type='text'
                      name='term3'
                      value={formatHarga(term3)}
                      disabled
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              ''
            )}
            {metode == 'high' ? (
              <>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: 'flex-end', alignItems: 'center' }}
                >
                  <h4 className='mb-6 mr-3'>Term {konversiRomawi(1)}</h4>
                  <Grid item sm={4} xs={12} className='mb-3'>
                    <TextValidator
                      variant='outlined'
                      className='w-full mb-3'
                      label=''
                      onChange={this.handleChangeItem}
                      type='text'
                      name='term1'
                      value={formatHarga(term1)}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: 'flex-end', alignItems: 'center' }}
                >
                  <h4 className='mb-6 mr-3'>Term {konversiRomawi(2)}</h4>
                  <Grid item sm={4} xs={12} className='mb-3'>
                    <TextValidator
                      variant='outlined'
                      className='w-full mb-3'
                      label=''
                      onChange={this.handleChangeItem}
                      type='text'
                      name='term2'
                      value={formatHarga(term2)}
                      disabled
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              ''
            )}
            <br />
            <br />
            <br />
            <Grid
              container
              spacing={2}
              style={{ justifyContent: 'flex-end', alignItems: 'center' }}
            >
              <h4 className='mb-6 mr-3'>PPN(10%)</h4>
              <Grid item sm={4} xs={12} className='mb-3'>
                <TextValidator
                  variant='outlined'
                  className='w-full mb-3'
                  label=''
                  onChange={this.handleChangeItem}
                  type='text'
                  name='ppn'
                  value={formatHarga(ppn)}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              style={{ justifyContent: 'flex-end', alignItems: 'center' }}
            >
              <h4 className='mb-6 mr-3'>Total Biaya</h4>
              <Grid item sm={4} xs={12} className='mb-3'>
                <TextValidator
                  variant='outlined'
                  className='w-full mb-3'
                  label=''
                  onChange={this.handleChangeItem}
                  type='text'
                  name='total_biaya'
                  value={formatHarga(total_biaya)}
                  disabled
                />
              </Grid>
            </Grid>
            <div className='w-full text-right'>
              <ButtonGroup className='mt-3'>
                <Button variant='contained' color='primary' type='submit'>
                  {submit ? (
                    <CircularProgress size={15} color='#fff' />
                  ) : (
                    'Update '
                  )}
                </Button>
              </ButtonGroup>
            </div>
          </ValidatorForm>
        </SimpleCard>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataPelanggan: state.pelanggan.data,
    detailInvoice: state.invoice.detail,
    st: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    editInvoice: (params) => dispatch(editInvoice(params)),
    getDetailInvoice: (id) => dispatch(getDetailInvoice(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditInvoice);
