import { Button, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import { getSigner } from "app/redux/actions/SignerActions";
import { getKaryawan } from "app/redux/actions/KaryawanActions";
import { getOfficeList } from "app/redux/actions/WebSettingActions";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Select from "react-select";
import { addSertifikat } from "app/redux/actions/SuketAction";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class TambahSertifikat extends Component {
  constructor() {
    super();
    this.state = {
      nama_signer: "",
      nama_karyawan: "",
      from_date: new Date(),
      to_date: new Date().setFullYear(new Date().getFullYear() + 1),
      position: "",
      category: 2,
      submit: 0,
      optionSigner: [],
      optionKaryawan: [],
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
      getOfficeList,
      dataKaryawan,
      dataOffice,
    } = this.props;
    const { from_date, to_date } = this.state;
    getSigner();
    getKaryawan(3);
    getOfficeList();

    let start = JSON.stringify(from_date);
    start = start.slice(1, 11);
    let end = JSON.stringify(new Date(to_date));
    end = end.slice(1, 11);

    this.setState({
      optionSigner: dataSigner,
      optionKaryawan: dataKaryawan,
      optionOffice: dataOffice,
      from_date: start,
      to_date: end,
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
      from_date,
      to_date,
      position,
      office_code,
    } = this.state;

    let params = {
      signer_code: nama_signer,
      karyawan_code: nama_karyawan,
      from_date: from_date,
      to_date: to_date,
      posisi: position,
      office_code: office_code,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { addSertifikat, history } = this.props;
    addSertifikat(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/sertifikat");
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

  handleChangeOffice = (val) => {
    this.setState({
      office_code: val.value,
    });
  };

  handleChangeKaryawan = (val) => {
    this.setState({
      nama_karyawan: val.value,
    });
  };

  handleDateMulai = (date) => {
    const event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      from_date: dateFormat,
    });
  };

  handleDateSelesai = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      to_date: dateFormat,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      nama_signer,
      submit,
      nama_karyawan,
      from_date,
      to_date,
      position,
      office_code,
    } = this.state;
    const { dataSigner, dataKaryawan, dataOffice } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Tambah Sertifikat">
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={office_code}
                  name="office_code"
                  options={dataOffice}
                  onChange={this.handleChangeOffice}
                  className="basic-multi-select mb-4"
                  placeholder="Perusahaan *"
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
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Position"
                  type="text"
                  name="position"
                  value={position}
                  onChange={this.handleChange}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
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
                    value={from_date}
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
                    value={to_date}
                    onChange={this.handleDateSelesai}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
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
    dataOffice: state.setting.dataOfficeList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getKaryawan: (type) => dispatch(getKaryawan(type)),
    getOfficeList: () => dispatch(getOfficeList()),
    addSertifikat: (params) => dispatch(addSertifikat(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TambahSertifikat);
