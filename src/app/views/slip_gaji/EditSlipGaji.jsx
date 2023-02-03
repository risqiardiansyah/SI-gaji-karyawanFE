import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Icon,
  FormHelperText,
  ButtonGroup,
} from "@material-ui/core";
import { getSigner } from "app/redux/actions/SignerActions";
import {
  getKaryawan,
  getDetailKaryawan,
  editSlip,
  getDetailSlip,
} from "app/redux/actions/KaryawanActions";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Select from "react-select";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { formatHarga } from "app/utils/globalFunction";
import { Link } from "react-router-dom";
import { getAllHeader } from "app/redux/actions/SignerActions";

class EditSlipGaji extends Component {
  constructor() {
    super();
    this.state = {
      nama_signer: "",
      nama_karyawan: "",
      tgl_slip: new Date().toISOString().split("T")[0],
      submit: 0,
      optionSigner: [],
      optionKaryawan: [],
      catatan: "",
      penambahan: [
        {
          index: 0,
          nama: "",
          biaya: 0,
          disabled: false,
        },
      ],
      pengurangan: [
        {
          index: 0,
          nama: "",
          biaya: 0,
          disabled: false,
        },
      ],
      kchanged: 0,
      detailKaryawan: {},
      hasil_bruto: 0,
      hasil_potongan: 0,
      pph: 0,
      gaji_pokok: 0,
      tunjangan: 0,
      gaji_bersih: 0,
      loaded: 0,
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
    const {
      getSigner,
      dataSigner,
      getKaryawan,
      getDetailSlip,
      dataKaryawan,
      getDetailKaryawan,
      getAllHeader,
    } = this.props;
    const { id, karyawan_code } = this.props.match.params;
    getSigner();
    getKaryawan(1);
    getDetailSlip(id);
    getDetailKaryawan(karyawan_code);
    getAllHeader("list");

    this.setState({
      optionSigner: dataSigner,
      optionKaryawan: dataKaryawan,
      // kchanged: 1,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { loaded } = this.state;
    // console.log("detail", nextProps);
    const detailKaryawan = nextProps.detailKaryawan;
    const detailSlip = nextProps.detailSlip;

    if (!loaded && Object.keys(detailSlip).length != 0) {
      // console.log("dslip", detailSlip);
      this.setState({
        penambahan: detailSlip?.penambahan,
        pengurangan: detailSlip?.pengurangan,
        tgl_slip: detailSlip?.tgl_slip,
        nama_signer: detailSlip?.signer_code,
        nama_karyawan: detailSlip?.karyawan_code,
        catatan: detailSlip?.notes,
        gaji_pokok: detailSlip?.gaji_pokok,
        tunjangan: detailSlip?.tunjangan,
        hasil_bruto: detailSlip?.total_terima,
        hasil_potongan: detailSlip?.total_potongan,
        gaji_bersih: detailSlip?.gaji_total,
        kop_code: detailSlip?.kop_code,
        loaded: 1,
      });
    }

    this.setState(
      {
        detailKaryawan: detailKaryawan,
      },
      () => {
        this.calculatePPH(detailKaryawan, false);
      }
    );
  }

  calculatePPH(detailKaryawan = {}, nw = true) {
    // console.log("dekar", detailKaryawan);
    // console.log("state", this.state);
    const { penambahan, pengurangan } = this.state;
    let pph = 0;
    // let ptkp = 54000000;
    let ptkp = 5000000;
    let kurang = 0;
    let hasil_bruto = 0;
    for (let i = 0; i < penambahan.length; i++) {
      hasil_bruto += penambahan[i].biaya;
    }
    for (let i = 0; i < pengurangan.length; i++) {
      kurang += pengurangan[i].biaya;
    }

    if (detailKaryawan.gaji_pokok >= ptkp) {
      pph = detailKaryawan.gaji_pokok * (11 / 100);
    }

    let newPengurangan = [];
    if (nw) {
      newPengurangan = [
        {
          index: 0,
          nama: "PPh 21",
          biaya: pph,
          disabled: false,
        },
      ];
    } else {
      newPengurangan = pengurangan;
      // newPengurangan[0]["biaya"] = pph;
    }

    this.setState({
      pengurangan: newPengurangan,
      hasil_bruto: hasil_bruto,
      hasil_potongan: kurang,
      pph: pph,
      gaji_pokok: detailKaryawan.gaji_pokok,
      tunjangan: detailKaryawan.tunjangan,
      gaji_bersih: hasil_bruto - kurang,
    });
  }

  submitForm = () => {
    this.setState(
      {
        submit: true,
      },
      () => {
        this.sendSubmit();
      }
    );
  };

  sendSubmit() {
    console.log(this.state);
    const {
      nama_signer,
      nama_karyawan,
      tgl_slip,
      gaji_pokok,
      tunjangan,
      gaji_bersih,
      penambahan,
      pengurangan,
      catatan,
      hasil_bruto,
      hasil_potongan,
      pph,
      kop_code,
    } = this.state;
    const { id } = this.props.match.params;

    let params = {
      slip_code: id,
      signer_code: nama_signer,
      karyawan_code: nama_karyawan,
      tgl_slip:
        tgl_slip == "" ? new Date().toISOString().split("T")[0] : tgl_slip,
      gaji_pokok: gaji_pokok,
      tunjangan: tunjangan,
      gaji_total: gaji_bersih,
      terima: penambahan,
      pengurangan: pengurangan,
      catatan: catatan,
      total_terima: hasil_bruto,
      total_potongan: hasil_potongan,
      kop_code: kop_code,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { editSlip, history } = this.props;
    editSlip(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/slip_gaji");
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Gagal",
          text: "Data gagal disimpan",
          timer: 2000,
          icon: "error",
        }).then(() =>
          this.setState({
            submit: false,
          })
        );
      });
  }

  handleChangeSigner = (val) => {
    this.setState({
      nama_signer: val.value,
    });
  };

  handleChangeKaryawan = (val) => {
    const { getDetailKaryawan } = this.props;
    getDetailKaryawan(val.value);
    this.setState({
      nama_karyawan: val.value,
      kchanged: 1,
    });
  };

  handleTanggal = (date) => {
    const event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tgl_slip: dateFormat,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addItem = () => {
    let { penambahan } = this.state;
    let data = [
      {
        index: penambahan.length + 1,
        nama: "",
        biaya: 0,
        disabled: false,
      },
    ];

    let all = penambahan.concat(data);

    this.setState({
      penambahan: all,
    });
  };

  deleteItem = (index) => {
    let { penambahan } = this.state;
    let newData = penambahan.filter((item) => item.index != index);

    this.setState(
      {
        penambahan: newData,
      },
      () => this.calculatePPH(this.state.detailKaryawan, false)
    );
  };

  handleChangeItem = (e) => {
    let idx = e.target.id;
    let { penambahan } = this.state;
    let newPenambahan = penambahan;
    newPenambahan[idx][e.target.name] = e.target.value;
    this.setState({
      penambahan: newPenambahan,
    });
  };

  handleChangeItemBiaya = (e) => {
    let idx = e.target.id;
    let { penambahan } = this.state;
    let newPenambahan = penambahan;
    let a = 0;
    a = Number(
      e.target.value.replaceAll(",", "").replaceAll(".", "").replaceAll("$", "")
    );

    if (typeof a == "number") {
      newPenambahan[idx][e.target.name] = a;
      this.setState(
        {
          penambahan: newPenambahan,
        },
        () => this.calculatePPH(this.state.detailKaryawan, false)
      );
    }
  };

  addItemPengurangan = () => {
    let { pengurangan } = this.state;
    let data = [
      {
        index: pengurangan.length + 1,
        nama: "",
        biaya: 0,
        disabled: false,
      },
    ];

    let all = pengurangan.concat(data);

    this.setState({
      pengurangan: all,
    });
  };

  deleteItemPengurangan = (index) => {
    let { pengurangan } = this.state;
    let newData = pengurangan.filter((item) => item.index != index);

    this.setState(
      {
        pengurangan: newData,
      },
      () => {
        this.calculatePPH(this.state.detailKaryawan, false);
        // this.handleCalculatePengurangan();
      }
    );
  };

  handleCalculatePengurangan = () => {
    let { pengurangan } = this.state;
    let kurang = 0;
    for (let i = 0; i < pengurangan.length; i++) {
      kurang += pengurangan[i].biaya;
    }

    this.setState({
      hasil_potongan: kurang,
    });
  };

  handleChangeItemPengurangan = (e) => {
    let idx = e.target.id;
    let { pengurangan } = this.state;
    let newPengurangan = pengurangan;
    newPengurangan[idx][e.target.name] = e.target.value;
    this.setState({
      pengurangan: newPengurangan,
    });
  };

  handleChangeItemBiayaPengurangan = (e) => {
    let idx = e.target.id;
    let { pengurangan } = this.state;
    let newPengurangan = pengurangan;
    let a = 0;
    a = Number(
      e.target.value.replaceAll(",", "").replaceAll(".", "").replaceAll("$", "")
    );

    if (typeof a == "number") {
      newPengurangan[idx][e.target.name] = a;
      this.setState(
        {
          pengurangan: newPengurangan,
        },
        () => {
          this.calculatePPH(this.state.detailKaryawan, false);
          // this.handleCalculatePengurangan();
        }
      );
    }
  };

  handleChangeKop = (val) => {
    this.setState({
      kop_code: val.value,
    });
  };

  render() {
    const {
      nama_signer,
      submit,
      nama_karyawan,
      tgl_slip,
      penambahan,
      pengurangan,
      hasil_bruto,
      hasil_potongan,
      pph,
      catatan,
      kop_code,
    } = this.state;
    const { dataSigner, dataKaryawan, detailKaryawan, dataKop } = this.props;

    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Edit Slip Gaji">
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Select
                  value={dataKop?.filter((item) => item.value == kop_code)}
                  name="kop_code"
                  options={dataKop}
                  onChange={this.handleChangeKop}
                  className="basic-multi-select mb-4"
                  placeholder="Kop Surat"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  value={dataSigner.filter((item) => item.value == nama_signer)}
                  name="nama_signer"
                  options={dataSigner}
                  onChange={this.handleChangeSigner}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Signer *"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  value={dataKaryawan.filter(
                    (item) => item.value == nama_karyawan
                  )}
                  name="nama_karyawan"
                  options={dataKaryawan}
                  onChange={this.handleChangeKaryawan}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Karyawan *"
                  isDisabled={true}
                />
                <FormHelperText>
                  Data karyawan tidak dapat diubah, karena akan mempengaruhi
                  data
                </FormHelperText>
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Slip Gaji *"
                    value={tgl_slip}
                    onChange={this.handleTanggal}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Notes"
                  onChange={this.handleChange}
                  type="text"
                  name="catatan"
                  value={catatan}
                  size="medium"
                />
              </Grid>
            </Grid>
            {nama_karyawan === "" ? (
              ""
            ) : detailKaryawan === "" || detailKaryawan?.gaji_pokok <= 0 ? (
              <p style={{ color: "red" }}>Gaji Karyawan Belum Diatur !</p>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <Table className="crud-table">
                      <TableHead className="bg-primary">
                        <TableRow>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            colSpan={3}
                          >
                            Penerimaan Bersih
                          </TableCell>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            colSpan={3}
                          >
                            &nbsp;
                          </TableCell>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            align="center"
                            colSpan={1}
                          >
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="mt-2">
                        {penambahan.map((item, index) => (
                          <TableRow hover key={index}>
                            <TableCell
                              className="font-poppins p-"
                              align="center"
                              colSpan={3}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Judul"
                                onChange={this.handleChangeItem}
                                type="text"
                                name="nama"
                                id={"" + index}
                                value={item.nama}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                                // helperText={formatRupiah(saldo, mata_uang)}
                                disabled={item.disabled}
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={3}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Jumlah"
                                onChange={this.handleChangeItemBiaya}
                                type="text"
                                name="biaya"
                                value={formatHarga(item.biaya)}
                                id={"" + index}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      Rp
                                    </InputAdornment>
                                  ),
                                }}
                                disabled={item.disabled}
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins pt-0"
                              align="center"
                              colSpan={1}
                            >
                              {item.disabled ? (
                                ""
                              ) : (
                                <Button
                                  variant="contained"
                                  className={
                                    " text-white elevation-z0 " +
                                      penambahan.length ==
                                    1
                                      ? ""
                                      : "bg-error"
                                  }
                                  onClick={() => this.deleteItem(item.index)}
                                  disabled={
                                    penambahan.length == 1 ? true : false
                                  }
                                >
                                  <Icon className={`text-white`}>delete</Icon>
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button
                      variant="contained"
                      className="bg-secondary text-white elevation-z0 mb-4"
                      onClick={this.addItem}
                    >
                      Tambah Item
                    </Button>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Table className="crud-table">
                      <TableHead className="bg-primary">
                        <TableRow>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            colSpan={3}
                          >
                            Pengurangan
                          </TableCell>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            colSpan={3}
                          >
                            &nbsp;
                          </TableCell>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            align="center"
                            colSpan={1}
                          >
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="mt-2">
                        {pengurangan.map((item, index) => (
                          <TableRow hover key={index}>
                            <TableCell
                              className="font-poppins p-"
                              align="center"
                              colSpan={3}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Judul"
                                onChange={this.handleChangeItemPengurangan}
                                type="text"
                                name="nama"
                                id={"" + index}
                                value={item.nama}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                                disabled={item.disabled}
                                // helperText={formatRupiah(saldo, mata_uang)}
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={3}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Jumlah"
                                onChange={this.handleChangeItemBiayaPengurangan}
                                type="text"
                                name="biaya"
                                value={formatHarga(item.biaya)}
                                id={"" + index}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      Rp
                                    </InputAdornment>
                                  ),
                                }}
                                disabled={item.disabled}
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins pt-0"
                              align="center"
                              colSpan={1}
                            >
                              {item.disabled ? (
                                ""
                              ) : (
                                <Button
                                  variant="contained"
                                  className={
                                    " text-white elevation-z0 " +
                                      pengurangan.length ==
                                    1
                                      ? ""
                                      : "bg-error"
                                  }
                                  onClick={() =>
                                    this.deleteItemPengurangan(item.index)
                                  }
                                  disabled={
                                    pengurangan.length == 1 ? true : false
                                  }
                                >
                                  <Icon className={`text-white`}>delete</Icon>
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button
                      variant="contained"
                      className="bg-secondary text-white elevation-z0 mb-4"
                      onClick={this.addItemPengurangan}
                    >
                      Tambah Item
                    </Button>
                  </Grid>
                </Grid>
                <br />
                <br />
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "flex-end", alignItems: "center" }}
                >
                  <h4 className="mb-6 mr-3">Penghasilan Bruto</h4>
                  <Grid item sm={4} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label=""
                      onChange={this.handleChangeItem}
                      type="text"
                      name="sub_total"
                      value={formatHarga(hasil_bruto)}
                      disabled
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "flex-end", alignItems: "center" }}
                >
                  <h4 className="mb-6 mr-3">Pengurangan</h4>
                  <Grid item sm={4} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label=""
                      onChange={this.handleChangeItem}
                      type="text"
                      name="sub_total"
                      value={formatHarga(hasil_potongan)}
                      disabled
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "flex-end", alignItems: "center" }}
                >
                  <h4 className="mb-6 mr-3">Gaji Bersih</h4>
                  <Grid item sm={4} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label=""
                      onChange={this.handleChangeItem}
                      type="text"
                      name="sub_total"
                      value={formatHarga(hasil_bruto - hasil_potongan)}
                      disabled
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            <br />
            <br />
            <div className="w-full text-right">
              {nama_karyawan && (
                <ButtonGroup className="mt-3">
                  <Button
                    variant="contained"
                    color="default"
                    type="button"
                    component={Link}
                    to={"/slip_gaji"}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submit}
                  >
                    {submit ? (
                      <CircularProgress size={15} color="#fff" />
                    ) : (
                      "Simpan "
                    )}
                  </Button>
                </ButtonGroup>
              )}
            </div>
          </ValidatorForm>
        </SimpleCard>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataSigner: state.signer.data,
    dataKaryawan: state.karyawan.data,
    detailKaryawan: state.karyawan.detailKaryawan,
    detailSlip: state.karyawan.detailSlip,
    dataKop: state.signer.dataKop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getKaryawan: (type) => dispatch(getKaryawan(type)),
    getDetailKaryawan: (karyawan_code) =>
      dispatch(getDetailKaryawan(karyawan_code)),
    editSlip: (params) => dispatch(editSlip(params)),
    getDetailSlip: (slip_code) => dispatch(getDetailSlip(slip_code)),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditSlipGaji);
