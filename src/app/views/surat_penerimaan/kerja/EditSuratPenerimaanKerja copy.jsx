import { Button, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import { getSigner } from "app/redux/actions/SignerActions";
import { getKaryawan } from "app/redux/actions/KaryawanActions";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Select from "react-select";
import {
  editPenerimaanKerja,
  getDetailPenerimaanKerja,
} from "app/redux/actions/PenerimaanActions";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { getOfficeList } from "app/redux/actions/WebSettingActions";

class EditSuratPenerimaanKerja extends Component {
  constructor() {
    super();
    this.state = {
      nama_signer: "",
      nama_karyawan: "",
      submit: 0,
      optionSigner: [],
      optionKaryawan: [],
      v_date: new Date(),
      narahubung: "",
      dataTipe: [
        {
          label: "Onsite",
          value: "onsite",
        },
        {
          label: "Online",
          value: "Online",
        },
        {
          label: "Hybrid",
          value: "Hybrid",
        },
      ],
      tipe: "",
      perusahaan: "",
      posisi: "",
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

  handleChange = (e) => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDateFromChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      date: dateFormat,
      v_date: event,
    });
  };

  componentDidMount() {
    const {
      getSigner,
      getKaryawan,
      getDetailPenerimaanKerja,
      match,
      getOfficeList,
    } = this.props;
    const { v_date } = this.state;
    const unique_code = match.params.id;
    getSigner();
    getKaryawan(1);
    getDetailPenerimaanKerja(unique_code);
    getOfficeList();

    let mulai = JSON.stringify(v_date);
    mulai = mulai.slice(1, 11);

    this.setState({
      v_date: mulai,
      unique_code: unique_code,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { detailKerja } = nextProps;

    this.setState({
      nama_signer: detailKerja?.signer_code,
      nama_karyawan: detailKerja?.karyawan_code,
      v_date: detailKerja?.date,
      date: detailKerja?.date,
      narahubung: detailKerja?.narahubung,
      tipe: detailKerja?.tipe,
      office_name: detailKerja?.office,
      posisi: detailKerja?.posisi,
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
      date,
      narahubung,
      unique_code,
      office_name,
      tipe,
      posisi,
    } = this.state;

    let params = {
      signer_code: nama_signer,
      karyawan_code: nama_karyawan,
      date: date,
      narahubung: narahubung,
      unique_code: unique_code,
      office_name: office_name,
      tipe: tipe,
      posisi: posisi,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { editPenerimaanKerja, history } = this.props;
    editPenerimaanKerja(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/kerja/penerimaan");
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

  handleTipe = (val) => {
    this.setState({
      tipe: val.value,
    });
  };

  handleOffice = (val) => {
    this.setState({
      office_name: val.value,
    });
  };

  render() {
    const {
      nama_signer,
      submit,
      nama_karyawan,
      v_date,
      narahubung,
      dataTipe,
      tipe,
      office_name,
      posisi,
    } = this.state;
    const { dataSigner, dataKaryawan, dataOffice } = this.props;
    console.log(this.state);
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Edit Penerimaan Kerja">
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Select
                  value={dataSigner.filter(
                    (item) => item.value === nama_signer
                  )}
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
                    (item) => item.value === nama_karyawan
                  )}
                  name="nama_karyawan"
                  options={dataKaryawan}
                  onChange={this.handleChangeKaryawan}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Karyawan *"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className="w-full m-0"
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Pemanggilan"
                    value={v_date}
                    onChange={this.handleDateFromChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Pembimbing"
                  onChange={this.handleChange}
                  type="text"
                  name="narahubung"
                  value={narahubung}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  value={dataOffice?.filter(
                    (item) => item.value === office_name
                  )}
                  name="office_name"
                  options={dataOffice}
                  onChange={this.handleOffice}
                  className="basic-multi-select mb-4"
                  placeholder="Perusahaan"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  alue={dataTipe?.filter((item) => item.value === tipe)}
                  name="tipe"
                  options={dataTipe}
                  onChange={this.handleTipe}
                  className="basic-multi-select mb-4"
                  placeholder="Tipe"
                />
              </Grid>
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
    detailKerja: state.penerimaan.detailKerja,
    dataOffice: state.setting.dataOfficeList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getKaryawan: (type) => dispatch(getKaryawan(type)),
    editPenerimaanKerja: (params) => dispatch(editPenerimaanKerja(params)),
    getDetailPenerimaanKerja: (unique_code) =>
      dispatch(getDetailPenerimaanKerja(unique_code)),
    getOfficeList: () => dispatch(getOfficeList()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSuratPenerimaanKerja);
