import { Button, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import Select from "react-select";
import { formatHarga } from "app/utils/globalFunction";
import { getSigner } from "app/redux/actions/SignerActions";
import { getKaryawan } from "app/redux/actions/KaryawanActions";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { addKontrak } from "app/redux/actions/KontrakActions";
import { getAllHeader } from "app/redux/actions/SignerActions";

class TambahKontrak extends Component {
  constructor() {
    super();
    this.state = {
      nama_signer: "",
      submit: 0,
      v_tanggal_mulai: new Date(),
      v_tanggal_selesai: new Date().setFullYear(new Date().getFullYear() + 1),
      optionSigner: [],
      optionKaryawan: [],
      dataLanguage: [
        {
          label: "Indonesia",
          value: "ind",
        },
        {
          label: "English",
          value: "eng",
        },
      ],
      bahasa: "",
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
    const { getSigner, dataSigner, getKaryawan, dataKaryawan, getAllHeader } =
      this.props;
    const { v_tanggal_mulai, v_tanggal_selesai } = this.state;
    getSigner();
    getKaryawan();
    getAllHeader("list");

    let mulai = JSON.stringify(v_tanggal_mulai);
    mulai = mulai.slice(1, 11);
    let selesai = JSON.stringify(new Date(v_tanggal_selesai));
    selesai = selesai.slice(1, 11);

    this.setState({
      optionSigner: dataSigner,
      optionKaryawan: dataKaryawan,
      tanggal_mulai: mulai,
      tanggal_selesai: selesai,
    });
  }

  handleChange = (e) => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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
      tanggal_mulai,
      tanggal_selesai,
      gaji,
      tunjangan,
      nama_karyawan,
      posisi,
      penanggung_jawab,
      kop_code,
    } = this.state;

    let params = {
      signer_code: nama_signer,
      karyawan_code: nama_karyawan,
      tanggal_mulai: tanggal_mulai,
      tanggal_selesai: tanggal_selesai,
      gaji: gaji,
      tunjangan: tunjangan,
      posisi: posisi,
      penanggung_jawab: penanggung_jawab,
      kop_code: kop_code,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { addKontrak, history } = this.props;
    addKontrak(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/kontrak");
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

  handleDateMulai = (date) => {
    const event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal_mulai: dateFormat,
      v_tanggal_mulai: event,
    });
  };

  handleDateSelesai = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal_selesai: dateFormat,
      v_tanggal_selesai: event,
    });
  };

  handleChangeSigner = (val) => {
    this.setState({
      nama_signer: val.value,
    });
  };

  handleChangeKaryawan = (val) => {
    this.setState({
      nama_karyawan: val.value,
    });
  };

  handleChangeHarga = (e) => {
    let a = Number(e.target.value.replaceAll(",", "").replaceAll(".", ""));
    if (typeof a == "number") {
      this.setState({
        [e.target.name]: a,
      });
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
      v_tanggal_mulai,
      v_tanggal_selesai,
      submit,
      gaji,
      tunjangan,
      nama_karyawan,
      posisi,
      penanggung_jawab,
      kop_code,
    } = this.state;
    const { dataSigner, dataKaryawan, dataKop } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Tambah Kontrak">
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
                  defaultValue={nama_signer}
                  name="nama_signer"
                  options={dataSigner}
                  onChange={this.handleChangeSigner}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Signer *"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={nama_karyawan}
                  name="nama_karyawan"
                  options={dataKaryawan}
                  onChange={this.handleChangeKaryawan}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Karyawan *"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Mulai *"
                    value={v_tanggal_mulai}
                    onChange={this.handleDateMulai}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Selesai *"
                    value={v_tanggal_selesai}
                    onChange={this.handleDateSelesai}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Gaji *"
                  onChange={this.handleChangeHarga}
                  type="text"
                  name="gaji"
                  value={formatHarga(gaji)}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Tunjangan *"
                  onChange={this.handleChangeHarga}
                  type="text"
                  name="tunjangan"
                  value={formatHarga(tunjangan)}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Posisi *"
                  onChange={this.handleChange}
                  type="text"
                  name="posisi"
                  value={posisi}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Penanggung Jawab *"
                  onChange={this.handleChange}
                  type="text"
                  name="penanggung_jawab"
                  value={penanggung_jawab}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              {/* <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={bahasa}
                  name="bahasa"
                  options={dataLanguage}
                  onChange={this.handleLanguage}
                  className="basic-multi-select mb-4"
                  placeholder="Bahasa"
                />
              </Grid> */}
            </Grid>
            <br />
            <br />
            <div className="w-full text-right">
              <ButtonGroup className="mt-3">
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
    dataKop: state.signer.dataKop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getKaryawan: () => dispatch(getKaryawan()),
    addKontrak: (params) => dispatch(addKontrak(params)),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TambahKontrak);
