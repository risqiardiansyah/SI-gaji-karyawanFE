import {
  Button,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  FormLabel,
} from "@material-ui/core";
import { getSigner } from "app/redux/actions/SignerActions";
import {
  getKaryawan,
  getDetailKaryawan,
} from "app/redux/actions/KaryawanActions";
import {
  getKriteriaPenilaian,
  editPenilaian,
  getDetailPenilaian,
} from "app/redux/actions/PenilaianActions";
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
import { Link } from "react-router-dom";

class EditPenilaian extends Component {
  constructor() {
    super();
    this.state = {
      nama_signer: "",
      nama_karyawan: "",
      tgl: new Date().toISOString().split("T")[0],
      submit: 0,
      optionSigner: [],
      optionKaryawan: [],
      optionTipe: [
        {
          value: "mingguan",
          label: "Mingguan",
        },
        {
          value: "bulanan",
          label: "Bulanan",
        },
        {
          value: "6bulanan",
          label: "6 Bulanan",
        },
      ],
      type: "",
      kchanged: 0,
      detailKaryawan: {},
      kriteriaMingguan: [],
      kriteriaBulanan: [],
      nilai_keseluruhan: 0,
      updated: false,
      mengetahui_code: "",
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
      dataKaryawan,
      getDetailPenilaian,
      match,
    } = this.props;
    getSigner();
    getKaryawan(3);
    getDetailPenilaian(match.params.penilaian_code);

    this.setState({
      optionSigner: dataSigner,
      optionKaryawan: dataKaryawan,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { kchanged, type, updated } = this.state;
    const kriteriaPenilaian = nextProps.kriteriaPenilaian;
    const detailPenilaian = nextProps.detailPenilaian;
    console.log("detpennn", detailPenilaian);

    if (!updated) {
      let kriteria = [];
      if (detailPenilaian.type == "mingguan") {
        kriteria = detailPenilaian.performance;
      } else {
        kriteria = detailPenilaian.performance;
      }

      this.setState({
        type: detailPenilaian.type,
        nama_signer: detailPenilaian.signer_code,
        mengetahui_code: detailPenilaian.mengetahui_code,
        nama_karyawan: detailPenilaian.karyawan_code,
        tgl: detailPenilaian.tgl,
        kriteriaMingguan: kriteria,
        kriteriaBulanan: kriteria,
        nilai_keseluruhan: detailPenilaian.total_nilai,
        updated: detailPenilaian?.idx ? true : false,
      });
    }

    if (kchanged == 1 && type == "mingguan" && kriteriaPenilaian.length > 0) {
      let kriteriaMingguan = [];
      for (let i = 0; i < kriteriaPenilaian.length; i++) {
        let detail = [];
        for (let x = 0; x < kriteriaPenilaian[i].detail.length; x++) {
          let detail2 = {
            pe_name: kriteriaPenilaian[i].detail[x].pe_name_id,
            pe_bobot: kriteriaPenilaian[i].detail[x].pe_bobot,
            pe_code: kriteriaPenilaian[i].detail[x].pe_code,
            acuan_nilai: kriteriaPenilaian[i].detail[x].acuan_nilai,
            group_mingguan: kriteriaPenilaian[i].group_mingguan,
            nilai: 0,
            total_nilai: 0,
            catatan: "",
          };

          detail.push(detail2);
        }

        let krit = [
          {
            index: i,
            group_mingguan: kriteriaPenilaian[i].group_mingguan,
            detail: detail,
          },
        ];

        kriteriaMingguan.push(...krit);
      }

      this.setState({
        kriteriaMingguan: kriteriaMingguan,
        kchanged: 0,
      });
    } else if (
      kchanged == 1 &&
      (type == "bulanan" || type == "6bulanan") &&
      kriteriaPenilaian.length > 0
    ) {
      let kriteriaBulanan = [];
      for (let i = 0; i < kriteriaPenilaian.length; i++) {
        let krit = {
          pe_name: kriteriaPenilaian[i].pe_name_id,
          pe_bobot: kriteriaPenilaian[i].pe_bobot,
          pe_code: kriteriaPenilaian[i].pe_code,
          acuan_nilai: kriteriaPenilaian[i].acuan_nilai,
          nilai: 0,
          total_nilai: 0,
          catatan: "",
        };
        kriteriaBulanan.push(krit);
      }

      this.setState({
        kriteriaBulanan: kriteriaBulanan,
        kchanged: 0,
      });
    }
  }

  calculateTotalNilai() {
    let { kriteriaMingguan, kriteriaBulanan, type } = this.state;
    let totalNilai = 0;
    if (type == "mingguan") {
      for (let i = 0; i < kriteriaMingguan.length; i++) {
        for (let x = 0; x < kriteriaMingguan[i].detail.length; x++) {
          let nilai =
            (kriteriaMingguan[i].detail[x].pe_bobot / 100) *
            kriteriaMingguan[i].detail[x].nilai;
          if (nilai == "") {
            nilai = 0;
          }
          totalNilai += nilai;
        }
      }
    } else {
      // FOR BULANAN
      for (let i = 0; i < kriteriaBulanan.length; i++) {
        let nilai =
          (kriteriaBulanan[i].pe_bobot / 100) * kriteriaBulanan[i].nilai;
        if (nilai == "") {
          nilai = 0;
        }
        totalNilai += nilai;
      }
    }

    this.setState({
      nilai_keseluruhan: totalNilai.toFixed(2),
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
    const {
      nama_signer,
      nama_karyawan,
      tgl,
      type,
      kriteriaMingguan,
      kriteriaBulanan,
      nilai_keseluruhan,
      mengetahui_code,
    } = this.state;

    let performance = [];
    if (type == "mingguan") {
      performance = kriteriaMingguan;
    } else if (type == "bulanan" || type == "6bulanan") {
      performance = kriteriaBulanan;
    }

    let params = {
      signer_code: nama_signer,
      karyawan_code: nama_karyawan,
      tgl: tgl == "" ? new Date().toISOString().split("T")[0] : tgl,
      type: type,
      performance: performance,
      nilai_keseluruhan: nilai_keseluruhan,
      penilaian_code: this.props.match.params.penilaian_code,
      mengetahui_code: mengetahui_code,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { editPenilaian, history } = this.props;
    editPenilaian(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/penilaian");
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

  handleChangeMengetahui = (val) => {
    this.setState({
      mengetahui_code: val.value,
    });
  };

  handleChangeType = (val) => {
    const { getKriteriaPenilaian } = this.props;
    const { nama_karyawan } = this.state;
    if (nama_karyawan) {
      getKriteriaPenilaian(val.value, nama_karyawan);
    }

    this.setState({
      type: val.value,
      kchanged: 1,
    });
  };

  handleChangeKaryawan = (val) => {
    const { getDetailKaryawan, getKriteriaPenilaian } = this.props;
    getKriteriaPenilaian(this.state.type, val.value);
    getDetailKaryawan(val.value);

    this.setState({
      nama_karyawan: val.value,
      kchanged: 1,
      type: this.state.type,
    });
  };

  handleTanggal = (date) => {
    const event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tgl: dateFormat,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeItem = (e) => {
    let idx = e.target.id;
    let splidx = idx.split("-");
    let { kriteriaMingguan } = this.state;
    let newKriteriaMingguan = kriteriaMingguan;

    newKriteriaMingguan[splidx[0]]["detail"][splidx[1]][e.target.name] =
      e.target.value;
    if (e.target.name == "nilai") {
      newKriteriaMingguan[splidx[0]]["detail"][splidx[1]]["total_nilai"] =
        (newKriteriaMingguan[splidx[0]]["detail"][splidx[1]]["pe_bobot"] /
          100) *
        e.target.value;
    }
    this.setState(
      {
        kriteriaMingguan: newKriteriaMingguan,
      },
      () => this.calculateTotalNilai()
    );
  };

  handleChangeItemBulanan = (e) => {
    let idx = e.target.id;
    let { kriteriaBulanan } = this.state;
    let newKriteriaBulanan = kriteriaBulanan;

    newKriteriaBulanan[idx][e.target.name] = e.target.value;
    if (e.target.name == "nilai") {
      newKriteriaBulanan[idx]["total_nilai"] =
        (newKriteriaBulanan[idx]["pe_bobot"] / 100) * e.target.value;
    }
    this.setState(
      {
        kriteriaBulanan: newKriteriaBulanan,
      },
      () => this.calculateTotalNilai()
    );
  };

  render() {
    const {
      nama_signer,
      submit,
      nama_karyawan,
      tgl,
      type,
      optionTipe,
      kriteriaMingguan,
      kriteriaBulanan,
      nilai_keseluruhan,
      mengetahui_code,
    } = this.state;
    const { dataSigner, dataKaryawan, detailKaryawan } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Edit Penilaian Karyawan">
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <FormLabel style={{ width: "100%" }}>Periode</FormLabel>
                <Select
                  value={optionTipe.filter((item) => item.value == type)}
                  name="type"
                  options={optionTipe}
                  onChange={this.handleChangeType}
                  className="basic-multi-select"
                  placeholder="Periode Penilaian *"
                  isDisabled={true}
                />
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Penilaian *"
                    value={tgl}
                    onChange={this.handleTanggal}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                    style={{ marginTop: 0 }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              {type && (
                <>
                  <Grid item sm={6} xs={12}>
                    <FormLabel style={{ width: "100%" }}>
                      Nama Karyawan
                    </FormLabel>
                    <Select
                      value={dataKaryawan.filter(
                        (item) => item.value == nama_karyawan
                      )}
                      name="nama_karyawan"
                      options={dataKaryawan}
                      onChange={this.handleChangeKaryawan}
                      className="basic-multi-select"
                      placeholder="Nama Karyawan *"
                      isDisabled={true}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormLabel style={{ width: "100%" }}>
                      Nama Reviewer
                    </FormLabel>
                    <Select
                      value={dataKaryawan.filter(
                        (item) => item.value == nama_signer
                      )}
                      name="nama_signer"
                      options={dataKaryawan}
                      onChange={this.handleChangeSigner}
                      className="basic-multi-select"
                      placeholder="Nama Reviewer *"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormLabel style={{ width: "100%" }}>
                      Dikethui Oleh
                    </FormLabel>
                    <Select
                      value={dataSigner.filter(
                        (item) => item.value == mengetahui_code
                      )}
                      name="mengetahui_code"
                      options={dataSigner}
                      onChange={this.handleChangeMengetahui}
                      className="basic-multi-select"
                      placeholder="Diketahui oleh *"
                    />
                  </Grid>
                </>
              )}
            </Grid>
            {nama_karyawan === "" ? (
              ""
            ) : detailKaryawan === "" || detailKaryawan?.divisi_code == "" ? (
              <p style={{ color: "red" }}>
                Atur divisi karyawan terlebih dahulu ! Atur{" "}
                <a href="/karyawan" style={{ color: "blue" }}>
                  disini
                </a>
              </p>
            ) : type == "mingguan" ? (
              <>
                <Grid container spacing={2}>
                  {kriteriaMingguan.map((item, idx) => (
                    <Grid item sm={12} xs={12}>
                      <Table className="crud-table">
                        <TableHead className="bg-primary">
                          <TableRow>
                            <TableCell
                              className="py-2 font-poppins font-bold text-white pl-2"
                              colSpan={3}
                            >
                              {item.group_mingguan
                                .replaceAll("_", " ")
                                .toUpperCase()}
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
                              colSpan={2}
                            >
                              &nbsp;
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="mt-2">
                          {item.detail.map((detail, index) => (
                            <TableRow hover key={index}>
                              <TableCell
                                className="font-poppins p-"
                                align="center"
                                colSpan={3}
                              >
                                <TextValidator
                                  variant="outlined"
                                  className="w-full mb-3"
                                  label="Kriteria"
                                  type="text"
                                  name="pe_name"
                                  id={"" + index}
                                  value={detail.pe_name}
                                  validators={["required"]}
                                  errorMessages={["Field is Required"]}
                                  size="small"
                                  disabled={true}
                                  inputProps={{
                                    style: { color: "black" },
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                className="font-poppins p-1"
                                align="center"
                                colSpan={1}
                              >
                                <TextValidator
                                  variant="outlined"
                                  className="w-full mb-3"
                                  label="Bobot"
                                  type="text"
                                  name="pe_bobot"
                                  value={detail.pe_bobot + "%"}
                                  id={"" + index}
                                  validators={["required"]}
                                  errorMessages={["Field is Required"]}
                                  size="small"
                                  disabled={true}
                                  inputProps={{
                                    style: { color: "black" },
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                className="font-poppins p-1"
                                align="center"
                                colSpan={1}
                              >
                                <TextValidator
                                  variant="outlined"
                                  className="w-full mb-3"
                                  label="Nilai"
                                  onChange={this.handleChangeItem}
                                  type="number"
                                  name="nilai"
                                  value={detail.nilai}
                                  id={idx + "-" + index}
                                  validators={["required"]}
                                  errorMessages={["Field is Required"]}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell
                                className="font-poppins p-1"
                                align="center"
                                colSpan={1}
                              >
                                <TextValidator
                                  variant="outlined"
                                  className="w-full mb-3"
                                  label="Acuan Nilai (Min)"
                                  type="text"
                                  name="acuan_nilai"
                                  value={detail.acuan_nilai}
                                  id={"" + index}
                                  validators={["required"]}
                                  errorMessages={["Field is Required"]}
                                  size="small"
                                  disabled={true}
                                  inputProps={{
                                    style: { color: "black" },
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                className="font-poppins p-1"
                                align="center"
                                colSpan={2}
                              >
                                <TextValidator
                                  variant="outlined"
                                  className="w-full mb-3"
                                  label="Catatan"
                                  onChange={this.handleChangeItem}
                                  type="text"
                                  name="catatan"
                                  value={detail.catatan}
                                  id={idx + "-" + index}
                                  // validators={["required"]}
                                  // errorMessages={["Field is Required"]}
                                  size="small"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  ))}
                </Grid>
                <br />
                <br />
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "flex-end", alignItems: "center" }}
                >
                  <h4 className="mb-6 mr-3">Nilai Keseluruhan</h4>
                  <Grid item sm={4} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label=""
                      onChange={this.handleChangeItem}
                      type="text"
                      name="nilai_keseluruhan"
                      value={nilai_keseluruhan}
                      disabled
                      size="small"
                    />
                  </Grid>
                </Grid>
              </>
            ) : type == "bulanan" || type == "6bulanan" ? (
              <>
                <Grid container spacing={2}>
                  <Grid item sm={12} xs={12}>
                    <Table className="crud-table">
                      <TableHead className="bg-primary">
                        <TableRow>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            colSpan={3}
                          >
                            Evaluasi Kinerja
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
                            colSpan={2}
                          >
                            &nbsp;
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="mt-2">
                        {kriteriaBulanan.map((detail, index) => (
                          <TableRow hover key={index}>
                            <TableCell
                              className="font-poppins p-"
                              align="center"
                              colSpan={3}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Kriteria"
                                type="text"
                                name="pe_name"
                                id={"" + index}
                                value={detail.pe_name}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                                disabled={true}
                                inputProps={{
                                  style: { color: "black" },
                                }}
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={1}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Bobot"
                                type="text"
                                name="pe_bobot"
                                value={detail.pe_bobot + "%"}
                                id={"" + index}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                                disabled={true}
                                inputProps={{
                                  style: { color: "black" },
                                }}
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={1}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Nilai"
                                onChange={this.handleChangeItemBulanan}
                                type="number"
                                name="nilai"
                                value={detail.nilai}
                                id={index}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={1}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Acuan Nilai (Min)"
                                type="text"
                                name="acuan_nilai"
                                value={detail.acuan_nilai}
                                id={"" + index}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                                disabled={true}
                                inputProps={{
                                  style: { color: "black" },
                                }}
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={2}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Catatan"
                                onChange={this.handleChangeItemBulanan}
                                type="text"
                                name="catatan"
                                value={detail.catatan}
                                id={index}
                                // validators={["required"]}
                                // errorMessages={["Field is Required"]}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
                <br />
                <br />
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "flex-end", alignItems: "center" }}
                >
                  <h4 className="mb-6 mr-3">Nilai Keseluruhan</h4>
                  <Grid item sm={4} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label=""
                      onChange={this.handleChangeItem}
                      type="text"
                      name="nilai_keseluruhan"
                      value={nilai_keseluruhan}
                      disabled
                      size="small"
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              ""
            )}
            <br />
            <br />
            <div className="w-full text-right">
              <ButtonGroup className="mt-3">
                <Button
                  variant="contained"
                  color="default"
                  type="button"
                  component={Link}
                  to={"/penilaian"}
                >
                  Batal
                </Button>
                {type && (
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
                )}
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
    dataSigner: state.signer.data,
    dataKaryawan: state.karyawan.data,
    detailKaryawan: state.karyawan.detailKaryawan,
    kriteriaPenilaian: state.penilaian.kriteriaPenilaian,
    detailPenilaian: state.penilaian.detailPenilaian,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getKaryawan: (type) => dispatch(getKaryawan(type)),
    editPenilaian: (params) => dispatch(editPenilaian(params)),
    getKriteriaPenilaian: (type, karyawan_code) =>
      dispatch(getKriteriaPenilaian(type, karyawan_code)),
    getDetailPenilaian: (code) => dispatch(getDetailPenilaian(code)),
    getDetailKaryawan: (karyawan_code) =>
      dispatch(getDetailKaryawan(karyawan_code)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPenilaian);
