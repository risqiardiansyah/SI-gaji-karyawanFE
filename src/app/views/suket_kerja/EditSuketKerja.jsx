import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { getSigner } from "app/redux/actions/SignerActions";
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
import Select from "react-select";
import {
  editSuket,
  getAllSuket,
  getDetailSuket,
} from "app/redux/actions/SuketAction";
import { getKaryawan } from "app/redux/actions/KaryawanActions";
import { getOfficeList } from "app/redux/actions/WebSettingActions";
import { getAllHeader } from "app/redux/actions/SignerActions";

class EditSuketMagang extends Component {
  constructor() {
    super();
    this.state = {
      nama_signer: "",
      nama_karyawan: "",
      from_date: new Date(),
      to_date: new Date(),
      position: "",
      category: 1,
      submit: 0,
      off: false,
      office_code: "",
      present: 0,
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
      getDetailSuket,
      match,
      getOfficeList,
      getAllHeader,
    } = this.props;
    getSigner();
    getKaryawan(1);
    getDetailSuket(match.params.id);
    getOfficeList();
    getAllHeader("list");

    this.setState({
      optionKaryawan: dataKaryawan,
      optionSigner: dataSigner,
    });
  }

  componentWillReceiveProps(nextProps) {
    const dataDetailSuket = nextProps.detailSuket;
    this.setState({
      nama_karyawan: dataDetailSuket?.karyawan_code,
      nama_signer: dataDetailSuket?.signer_code,
      from_date: dataDetailSuket?.from_date,
      to_date: dataDetailSuket?.to_date,
      position: dataDetailSuket?.position,
      category: dataDetailSuket?.category,
      office_code: dataDetailSuket?.office || "",
      kop_code: dataDetailSuket?.kop_code || "",
      present: dataDetailSuket?.present || 0,
    });
  }

  submitForm = () => {
    this.setState({ submit: true }, () => this.sendSubmit());
  };

  sendSubmit() {
    const {
      nama_karyawan,
      nama_signer,
      from_date,
      to_date,
      position,
      category,
      office_code,
      kop_code,
      present,
    } = this.state;

    const { match } = this.props;

    const params = {
      karyawan_code: nama_karyawan,
      signer_code: nama_signer,
      from_date: from_date,
      to_date: to_date,
      position: position,
      category: category,
      unique_code: match.params.id,
      office: office_code,
      kop_code: kop_code,
      present: present,
    };

    this.submitData(params);
  }
  submitData(params) {
    const { editSuket, history } = this.props;

    editSuket(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/suket_kerja");
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

  handleDateKirimChange = (date) => {
    let event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal_dikirm: dateFormat,
      v_tanggal_dikirim: event,
    });
  };

  handleDateJatuhChange = (date) => {
    let event = new Date(date);

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
        nama: "",
        biaya: "",
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

  handleChangeKaryawan = (val) => {
    this.setState({
      ...this.state,
      nama_karyawan: val.value,
    });
  };

  handleChangeSigner = (val) => {
    this.setState({
      ...this.state,
      nama_signer: val.value,
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

  handleChangePresent = (e) => {
    e.persist();
    const { present } = this.state;
    this.setState({
      [e.target.name]: !present,
    });
  };

  render() {
    const {
      nama_karyawan,
      nama_signer,
      from_date,
      to_date,
      position,
      submit,
      office_code,
      kop_code,
      present,
    } = this.state;
    const { dataKaryawan, dataSigner, dataOffice, dataKop } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Edit Surat Keterangan Kerja">
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
                  value={dataOffice.filter(
                    (item) => item.value === office_code
                  )}
                  name="office_code"
                  options={dataOffice}
                  onChange={this.handleChangeOffice}
                  className="basic-multi-select mb-4"
                  placeholder="Perusahaan *"
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
                  placeholder="Nama Karyawan"
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
                  placeholder="Nama Signer"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item sm={5} xs={12}>
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
                <Grid item sm={5} xs={12}>
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
                    disabled={present}
                  />
                </Grid>
                <Grid item sm={2} xs={12} style={{ marginTop: "25px" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={present}
                        onChange={this.handleChangePresent}
                        name="present"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    }
                    label="Masih Bekerja"
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
    dataKaryawan: state.karyawan.data,
    dataSigner: state.signer.data,
    detailSuket: state.suket.detail,
    dataOffice: state.setting.dataOfficeList,
    dataKop: state.signer.dataKop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getKaryawan: (type) => dispatch(getKaryawan(type)),
    getAllSuket: () => dispatch(getAllSuket()),
    editSuket: (params) => dispatch(editSuket(params)),
    getDetailSuket: (code) => dispatch(getDetailSuket(code)),
    getOfficeList: () => dispatch(getOfficeList()),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditSuketMagang);
