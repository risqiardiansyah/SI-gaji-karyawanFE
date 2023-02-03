import { Button, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import { getSigner } from "app/redux/actions/SignerActions";
import { getKaryawan } from "app/redux/actions/KaryawanActions";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Select from "react-select";
import { addSuket } from "app/redux/actions/SuketAction";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getOfficeList } from "app/redux/actions/WebSettingActions";
import { getAllHeader } from "app/redux/actions/SignerActions";

class TambahSuketMagang extends Component {
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
    const {
      getSigner,
      dataSigner,
      getKaryawan,
      dataKaryawan,
      getOfficeList,
      getAllHeader,
    } = this.props;
    const { from_date, to_date } = this.state;
    getSigner();
    getKaryawan(2);
    getOfficeList();
    getAllHeader("list");

    let start = JSON.stringify(from_date);
    start = start.slice(1, 11);
    let end = JSON.stringify(new Date(to_date));
    end = end.slice(1, 11);

    this.setState({
      optionSigner: dataSigner,
      optionKaryawan: dataKaryawan,
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
      category,
      kop_code,
      office_code,
    } = this.state;

    let params = {
      signer_code: nama_signer,
      karyawan_code: nama_karyawan,
      from_date: from_date,
      to_date: to_date,
      position: position,
      category: category,
      kop_code: kop_code,
      office: office_code,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { addSuket, history } = this.props;
    addSuket(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/suket_magang");
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

  // handleLanguage = (val) => {
  //   this.setState({
  //     bahasa: val.value,
  //   });
  // };

  handleChangeOffice = (val) => {
    this.setState({
      office_code: val.value,
    });
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
      from_date,
      to_date,
      position,
      bahasa,
      kop_code,
      office_code,
    } = this.state;
    const { dataSigner, dataKaryawan, dataOffice, dataKop } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Tambah Surat Keterangan Magang">
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
            <Grid container spacing={2}>
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
    dataOffice: state.setting.dataOfficeList,
    dataKop: state.signer.dataKop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getKaryawan: (type) => dispatch(getKaryawan(type)),
    addSuket: (params) => dispatch(addSuket(params)),
    getOfficeList: () => dispatch(getOfficeList()),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TambahSuketMagang);
