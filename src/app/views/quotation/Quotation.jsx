import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  InputAdornment,
  Table,
  TableCell,
  TableRow,
  TextField,
  TableBody,
  TableHead,
  Card,
} from '@material-ui/core';
import {
  getQuotation,
  updateStatusQuotation,
  downloadQuotation,
  delQuotation,
} from 'app/redux/actions/QuotationAction';
import { formatTanggal } from 'app/utils/globalFunction';
import { SimpleCard } from 'matx';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import AddQuotation from './AddQuotation';

class Quotation extends Component {
  constructor() {
    super();
    this.state = {
      openAdd: false,
      type: '',
      modalEdit: false,
      dataEdit: {
        id: '',
        kategori: '',
        type: '',
      },
      search: '',
      excellent: false,
    };
  }

  componentDidMount() {
    const { getQuotation } = this.props;
    getQuotation();
  }

  handleModalEdit = (data) => {
    this.setState({
      modalEdit: true,
      dataEdit: data,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      modalEdit: false,
    });
  };

  handleDelete = (id) => {
    const { delQuotation, getQuotation } = this.props;
    Swal.fire({
      title: 'Hapus',
      text: 'Apakah kamu yakin',
      showCancelButton: true,
      confirmButtonText: 'Yakin',
      cancelButtonText: 'Batal',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        delQuotation(id)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: 'Berhasil',
                text: 'Data berhasil dihapus',
                timer: 2000,
                icon: 'success',
              });
              getQuotation();
            }
          })
          .catch((err) => {
            console.log('err', err);
            Swal.fire({
              title: 'gagal',
              text: 'Data Gagal dihapus',
              timer: 2000,
              icon: 'error',
            });
          });
      }
    });
  };

  printData = (quotation_code, send_email) => {
    Swal.fire({
      title: 'Mohon Tunggu !',
      html: 'Mengambil Data..', // add html attribute if you want or remove
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 7000,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const { downloadQuotation } = this.props;
    const { excellent } = this.state;
    if (excellent) {
      downloadQuotation(quotation_code, 'excellent', send_email).then((res) => {
        window.open(res.data.pdf_path);
      });
    } else {
      downloadQuotation(quotation_code, send_email).then((res) => {
        window.open(res.data.pdf_path);
      });
    }
  };

  renderTable = () => {
    const { search, page, rowsPerPage } = this.state;
    const { dataQuotation } = this.props;
    return dataQuotation?.length > 0 ? (
      dataQuotation
        .filter(
          (item) =>
            item.mitra_name?.toLowerCase().includes(search.toLowerCase()) ||
            item.quotation_date?.toLowerCase().includes(search.toLowerCase()) ||
            item.about?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.mitra_name}</TableCell>
            <TableCell>{formatTanggal(item.quotation_date)}</TableCell>
            <TableCell colSpan={2}>{item.about}</TableCell>
            <TableCell>{item.signer_name}</TableCell>
            <TableCell>
              {item.bahasa === 'eng' ? 'English' : 'Indonesia'}
            </TableCell>
            <TableCell align="center" colSpan={3}>
              <ButtonGroup aria-label="group">
                <Button
                  onClick={() => this.handleEdit(item.quotation_code)}
                  variant="contained"
                  className="bg-primary text-white elevation-z0"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => this.printData(item.quotation_code, 0)}
                  variant="contained"
                  className="bg-secondary text-white elevation-z0"
                  size="small"
                >
                  Print
                </Button>
                <Button
                  onClick={() => this.printData(item.quotation_code, 1)}
                  variant="contained"
                  className="bg-primary text-white elevation-z0"
                  size="small"
                >
                  Send E-mail
                </Button>
                <Button
                  onClick={() => this.handleDelete(item.quotation_code)}
                  variant="contained"
                  className="bg-error text-white elevation-z0"
                  size="small"
                >
                  Hapus
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))
    ) : (
      <TableRow hover>
        <TableCell colSpan={10} align="center">
          {' '}
          Data kosong{' '}
        </TableCell>
      </TableRow>
    );
  };

  handleEditKategori = (data, id) => {
    this.setState({
      modalEdit: true,
      dataEdit: {
        id: data.value,
        kategori: data.label,
        type: id,
      },
    });
  };

  handleCloseAdd = () => {
    const { getQuotation } = this.props;
    this.setState({
      openAdd: false,
    });
    getQuotation();
  };

  handleOpenAdd = (type) => {
    this.setState({
      type: type,
      openAdd: true,
    });
  };

  handleCloseEdit = () => {
    const { getQuotation } = this.props;
    this.setState({
      modalEdit: false,
    });
    getQuotation();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAdd = () => {
    const { history } = this.props;
    history.push('/tambah/quotation');
  };

  handleEdit = (param) => {
    const { history } = this.props;
    history.push(`/edit/quotation/${param}`);
  };

  render() {
    const { openAdd, modalEdit, type, dataEdit, search } = this.state;

    return (
      <div className="m-sm-30">
        <SimpleCard title="Quotation" subtitle="Data Quotation">
          <>
            <Grid
              container
              spacing={2}
              justify="space-between"
              className="my-4"
            >
              <Grid item lg={5} md={5} sm={12} xs={12} className="mb-4">
                <ButtonGroup aria-label="group">
                  <Button
                    onClick={() => this.handleAdd()}
                    variant="contained"
                    color="primary"
                    className="elevation-z0 font-medium"
                  >
                    Tambah Quotation
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <div className="flex items-center">
                  <TextField
                    variant="standard"
                    className="w-full"
                    placeholder="Cari"
                    onChange={this.handleChange}
                    value={search}
                    name="search"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon>search</Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </Grid>
            </Grid>
            <Card className="p-0 border-radius-0 overflow-auto">
              <Table className="buku-kas-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="pl-2">No.</TableCell>
                    <TableCell>Mitra</TableCell>
                    <TableCell>Tanggal</TableCell>
                    <TableCell colSpan={2}>Layanan</TableCell>
                    <TableCell>Signer</TableCell>
                    <TableCell>Bahasa</TableCell>
                    <TableCell align="center" colSpan={3}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTable()}</TableBody>
              </Table>
            </Card>
          </>
        </SimpleCard>
        {openAdd && (
          <AddQuotation
            open={openAdd}
            type={type}
            handleClose={this.handleCloseAdd}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataQuotation: state.quotation.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getQuotation: () => dispatch(getQuotation()),
    updateStatusQuotation: (params) => dispatch(updateStatusQuotation(params)),
    downloadQuotation: (quotation_code, send_email) =>
      dispatch(downloadQuotation(quotation_code, send_email)),

    delQuotation: (params) => dispatch(delQuotation(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Quotation);
