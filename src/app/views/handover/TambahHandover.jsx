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
  Icon,
} from "@material-ui/core";
import { getSigner } from "app/redux/actions/SignerActions";
import { getKaryawan } from "app/redux/actions/KaryawanActions";
import { createHO } from "app/redux/actions/HandoverActions";
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

class TambahHandover extends Component {
  constructor() {
    super();
    this.state = {
      tgl_masuk: new Date().toISOString().split("T")[0],
      tgl_keluar: new Date().toISOString().split("T")[0],
      submit: 0,
      dataAlasan: [
        {
          label: "Selesai Kontrak",
          value: "sk",
        },
        {
          label: "Lainnya",
          value: "lain",
        },
      ],
      alasantext: "",
      ho_list: [
        {
          index: 0,
          klien: "",
          pic: "",
          serahterimakan: "",
        },
      ],
      nama_signer: "",
      nama_karyawan: "",
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
    const { getSigner, getKaryawan } = this.props;
    getSigner();
    getKaryawan(3);
  }

  componentWillReceiveProps(nextProps) {
    //
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
      tgl_masuk,
      tgl_keluar,
      alasan,
      ho_list,
      nama_signer,
      nama_karyawan,
      alasantext,
    } = this.state;

    let params = {
      alasan: alasan,
      alasantext: alasantext,
      signer_code: nama_signer,
      penerima_ho: nama_karyawan,
      tgl_masuk: tgl_masuk,
      tgl_resign: tgl_keluar,
      ho_list: ho_list,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { createHO, history } = this.props;
    createHO(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/handover");
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

  handleTanggalMasuk = (date) => {
    const event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tgl_masuk: dateFormat,
    });
  };

  handleTanggalKeluar = (date) => {
    const event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tgl_keluar: dateFormat,
    });
  };

  handleChange = (event) => {
    console.log(event);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeItem = (e) => {
    let idx = e.target.id;
    let { ho_list } = this.state;
    let newHoList = ho_list;

    newHoList[idx][e.target.name] = e.target.value;

    this.setState({
      ho_list: newHoList,
    });
  };

  addItemHOList = () => {
    let { ho_list } = this.state;
    let data = [
      {
        index: ho_list.length + 1,
        klien: "",
        pic: "",
        serahterimakan: "",
      },
    ];

    let all = ho_list.concat(data);
    for (let i = 0; i < all.length; i++) {
      all[i].index = i;
    }

    this.setState({
      ho_list: all,
    });
  };

  deleteItem = (index) => {
    let { ho_list } = this.state;
    let newData = ho_list.filter((item) => item.index != index);

    this.setState({
      ho_list: newData,
    });
  };

  handleChangeSigner = (val) => this.setState({ nama_signer: val.value });
  handleChangeKaryawan = (val) => this.setState({ nama_karyawan: val.value });
  handleChangeAlasan = (val) => this.setState({ alasan: val.value });

  render() {
    const {
      submit,
      tgl_masuk,
      tgl_keluar,
      dataAlasan,
      alasan,
      alasantext,
      nama_signer,
      ho_list,
      nama_karyawan,
    } = this.state;
    const { dataSigner, dataKaryawan } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Tambah data Handover">
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Masuk *"
                    value={tgl_masuk}
                    onChange={this.handleTanggalMasuk}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                    style={{ marginTop: 0 }}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Keluar *"
                    value={tgl_keluar}
                    onChange={this.handleTanggalKeluar}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                    style={{ marginTop: 0 }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={alasan}
                  name="alasan_resign"
                  options={dataAlasan}
                  onChange={this.handleChangeAlasan}
                  className="basic-multi-select"
                  placeholder="Alasan Keluar *"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {alasan == "lain" && (
                  <TextValidator
                    variant="outlined"
                    className="w-full mb-3"
                    label="Masukkan alasan *"
                    type="text"
                    name="alasantext"
                    value={alasantext}
                    validators={["required"]}
                    errorMessages={["Field is Required"]}
                    size="small"
                    onChange={this.handleChange}
                  />
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={nama_karyawan}
                  name="nama_karyawan"
                  options={dataKaryawan}
                  onChange={this.handleChangeKaryawan}
                  className="basic-multi-select"
                  placeholder="Penerima Handover *"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={nama_signer}
                  name="nama_signer"
                  options={dataSigner}
                  onChange={this.handleChangeSigner}
                  className="basic-multi-select"
                  placeholder="Mengetahui atasan *"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Table className="crud-table mt-5">
                  <TableHead className="bg-primary">
                    <TableRow>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        colSpan={3}
                      >
                        Yang diserahterimakan
                      </TableCell>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        colSpan={4}
                      >
                        PIC / Keterangan
                      </TableCell>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        align="left"
                        colSpan={3}
                      >
                        Yang diserahterimakan / Jabatan
                      </TableCell>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        align="center"
                        colSpan={1}
                      >
                        &nbsp;
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="mt-2">
                    {ho_list.map((detail, index) => (
                      <TableRow hover key={index}>
                        <TableCell
                          className="font-poppins p-"
                          align="left"
                          colSpan={3}
                        >
                          <TextValidator
                            variant="outlined"
                            className="w-full mb-3"
                            label="Pekerjaan / Klien *"
                            type="text"
                            name="klien"
                            id={"" + index}
                            value={detail.klien}
                            validators={["required"]}
                            errorMessages={["Field is Required"]}
                            size="small"
                            onChange={this.handleChangeItem}
                          />
                        </TableCell>
                        <TableCell
                          className="font-poppins p-1"
                          align="left"
                          colSpan={4}
                        >
                          <TextValidator
                            variant="outlined"
                            className="w-full mb-3"
                            label="PIC / Keterangan *"
                            type="text"
                            name="pic"
                            value={detail.pic}
                            id={"" + index}
                            validators={["required"]}
                            errorMessages={["Field is Required"]}
                            size="small"
                            onChange={this.handleChangeItem}
                          />
                        </TableCell>
                        <TableCell
                          className="font-poppins p-1"
                          align="left"
                          colSpan={3}
                        >
                          <TextValidator
                            variant="outlined"
                            className="w-full mb-3"
                            label="Contoh: Mba Mifta - 6282112522908 *"
                            onChange={this.handleChangeItem}
                            type="text"
                            name="serahterimakan"
                            value={detail.serahterimakan}
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
                          <div className="mb-3">
                            <Button
                              variant="contained"
                              size="small"
                              className={
                                "text-white elevation-z0 " + ho_list.length == 1
                                  ? ""
                                  : "bg-error"
                              }
                              onClick={() => this.deleteItem(detail.index)}
                              disabled={ho_list.length == 1 ? true : false}
                            >
                              <Icon className={`text-white`}>delete</Icon>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  className="bg-secondary text-white elevation-z0 mb-4"
                  onClick={this.addItemHOList}
                >
                  Tambah Item
                </Button>
              </Grid>
            </Grid>

            <br />
            <br />
            <div className="w-full text-right">
              <ButtonGroup className="mt-3">
                <Button
                  variant="contained"
                  color="default"
                  type="button"
                  component={Link}
                  to={"/handover"}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getKaryawan: (type) => dispatch(getKaryawan(type)),
    createHO: (params) => dispatch(createHO(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TambahHandover);
