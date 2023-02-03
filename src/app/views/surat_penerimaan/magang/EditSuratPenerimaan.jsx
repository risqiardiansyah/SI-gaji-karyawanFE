import { Button, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import { getSigner } from "app/redux/actions/SignerActions";
import { getAllKaryawan, getKaryawan } from "app/redux/actions/KaryawanActions";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Select from "react-select";
import {
  editPenerimaanMagang,
  getDetailPenerimaanMagang,
} from "app/redux/actions/PenerimaanActions";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { getOfficeList } from "app/redux/actions/WebSettingActions";
import { getAllHeader } from "app/redux/actions/SignerActions";

class EditSuratPenerimaan extends Component {
  constructor() {
    super();
    this.state = {
      nama_signer: "",
      nama_karyawan: "",
      submit: 0,
      optionSigner: [],
      optionKaryawan: [],
      v_from_date: new Date(),
      v_to_date: new Date(),
      pembimbing: "",
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
      benefit: "",
      insentif: 0,
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
      from_date: dateFormat,
      v_from_date: event,
    });
  };

  handleDateToChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      to_date: dateFormat,
      v_to_date: event,
    });
  };

  componentDidMount() {
    const {
      getSigner,
      getKaryawan,
      getDetailPenerimaanMagang,
      match,
      getOfficeList,
      getAllHeader,
      getAllKaryawan,
    } = this.props;
    const { v_from_date } = this.state;
    const unique_code = match.params.id;
    getSigner();
    getKaryawan(2);
    getDetailPenerimaanMagang(unique_code);
    getOfficeList();
    getAllHeader("list");
    getAllKaryawan();

    let mulai = JSON.stringify(v_from_date);
    mulai = mulai.slice(1, 11);

    this.setState({
      from_date: mulai,
      to_date: mulai,
      unique_code: unique_code,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { detailMagang } = nextProps;

    this.setState({
      nama_signer: detailMagang?.signer_code,
      nama_karyawan: detailMagang?.karyawan_code,
      v_from_date: detailMagang?.from_date,
      v_to_date: detailMagang?.to_date,
      from_date: detailMagang?.from_date,
      to_date: detailMagang?.to_date,
      pembimbing: detailMagang?.pembimbing,
      office_name: detailMagang?.office,
      tipe: detailMagang?.tipe,
      posisi: detailMagang?.posisi,
      kop_code: detailMagang?.kop_code,
      benefit: detailMagang?.benefit,
      insentif: detailMagang?.insentif,
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
      to_date,
      from_date,
      pembimbing,
      unique_code,
      office_name,
      tipe,
      posisi,
      kop_code,
      benefit,
      insentif,
    } = this.state;

    let params = {
      signer_code: nama_signer,
      karyawan_code: nama_karyawan,
      to_date: to_date,
      from_date: from_date,
      pembimbing: pembimbing,
      unique_code: unique_code,
      office_name: office_name,
      tipe: tipe,
      posisi: posisi,
      kop_code: kop_code,
      benefit: benefit,
      insentif: insentif,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { editPenerimaanMagang, history } = this.props;
    editPenerimaanMagang(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/magang/penerimaan");
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

  handleChangeKop = (val) => {
    this.setState({
      kop_code: val.value,
    });
  };

  handlePembimbing = (val) => {
    this.setState({
      pembimbing: val.value,
    });
  };

  render() {
    const {
      nama_signer,
      submit,
      nama_karyawan,
      v_from_date,
      v_to_date,
      pembimbing,
      dataTipe,
      tipe,
      office_name,
      posisi,
      kop_code,
      benefit,
      insentif,
    } = this.state;
    const { dataSigner, dataKaryawan, dataOffice, dataKop, dataAllKaryawan } =
      this.props;
    console.log(this.state);
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Tambah Penerimaan Magang">
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
                    className="w-full"
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Dari Tanggal"
                    value={v_from_date}
                    onChange={this.handleDateFromChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item sm={6} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className="w-full"
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Sampai Tanggal"
                    value={v_to_date}
                    onChange={this.handleDateToChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Select
                  value={{
                    label: pembimbing,
                    value: pembimbing,
                  }}
                  name="pembimbing"
                  options={dataAllKaryawan?.map((val) => ({
                    label: val.nama,
                    value: val.nama,
                  }))}
                  onChange={this.handlePembimbing}
                  className="basic-multi-select mb-4"
                  placeholder="Pembimbing"
                />
              </Grid>
              {/* <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Pembimbing"
                  onChange={this.handleChange}
                  type="text"
                  name="pembimbing"
                  value={pembimbing}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid> */}
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
                  value={dataTipe?.filter((item) => item.value === tipe)}
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
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Benefit *"
                  onChange={this.handleChange}
                  type="text"
                  name="benefit"
                  value={benefit}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Insentif *"
                  onChange={this.handleChange}
                  type="text"
                  name="insentif"
                  value={insentif}
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
    detailMagang: state.penerimaan.detailMagang,
    dataOffice: state.setting.dataOfficeList,
    dataKop: state.signer.dataKop,
    dataAllKaryawan: state.karyawan.allData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getKaryawan: (type) => dispatch(getKaryawan(type)),
    editPenerimaanMagang: (params) => dispatch(editPenerimaanMagang(params)),
    getDetailPenerimaanMagang: (unique_code) =>
      dispatch(getDetailPenerimaanMagang(unique_code)),
    getOfficeList: () => dispatch(getOfficeList()),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
    getAllKaryawan: () => dispatch(getAllKaryawan()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSuratPenerimaan);
