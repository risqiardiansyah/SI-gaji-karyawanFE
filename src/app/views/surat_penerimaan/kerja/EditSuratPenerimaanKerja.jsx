import {
  Button,
  ButtonGroup,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
} from "@material-ui/core";
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
import { getOfficeList } from "app/redux/actions/WebSettingActions";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { getTunjangan } from "app/redux/actions/WebSettingActions";
import { formatHarga } from "app/utils/globalFunction";
import { getAllHeader } from "app/redux/actions/SignerActions";

class EditSuratPenerimaanKerja extends Component {
  constructor() {
    super();
    this.state = {
      nama_signer: "",
      nama_karyawan: "",
      submit: 0,
      v_date: new Date(),
      mx_date: new Date(),
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
      dataTipeKaryawan: [
        {
          label: "Kontrak",
          value: "kontrak",
        },
        {
          label: "Tetap",
          value: "tetap",
        },
      ],
      dataProbation: [
        {
          label: "Ya, 1 Bulan",
          value: 1,
        },
        {
          label: "Ya, 2 Bulan",
          value: 2,
        },
        {
          label: "Ya, 3 Bulan",
          value: 3,
        },
        {
          label: "Tidak",
          value: 0,
        },
      ],
      dataJatahCuti: [],
      jatah_cuti: 1,
      detail_cuti: "",
      tipe_karyawan: "",
      perusahaan: "",
      posisi: "",
      probation: 1,
      gaji_pokok: 0,
      receive: false,
      tunjanganDataBiasa: [],
      tunjanganDataPrivilege: [],
      tunjanganDataLain: [],
      tunjanganBiasa: [],
      tunjanganPrivilege: [],
      tunjanganOther: [],
      tunjangan: 0,
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

  handleDateChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      date: dateFormat,
      v_date: event,
    });
  };

  handleMxDateChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      mx_date: dateFormat,
      mxdate: event,
    });
  };

  componentDidMount() {
    const {
      getSigner,
      getKaryawan,
      getTunjangan,
      getOfficeList,
      getDetailPenerimaanKerja,
      match,
      getAllHeader,
    } = this.props;
    const { v_date } = this.state;
    const unique_code = match.params.id;
    getDetailPenerimaanKerja(unique_code);
    getSigner();
    getKaryawan(1);
    getTunjangan(unique_code);
    getOfficeList();
    this.handleDataJatahCuti();
    this.handleSetTunjanganList();
    getAllHeader("list");

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
      mx_date: detailKerja?.max_response,
      mxdate: detailKerja?.max_response,
      narahubung: detailKerja?.narahubung,
      tipe: detailKerja?.tipe,
      tipe_karyawan: detailKerja?.tipe_karyawan,
      gaji_pokok: detailKerja?.gaji_pokok,
      probation: detailKerja?.probation,
      jatah_cuti: detailKerja?.jatah_cuti,
      detail_cuti: detailKerja?.detail_cuti,
      office_name: detailKerja?.office,
      posisi: detailKerja?.posisi,
      kop_code: detailKerja?.kop_code,
      tunjangan: detailKerja?.tunjangan,
      tunjanganPrivilege: detailKerja?.tunjangan_privilege?.split(", "),
      tunjanganOther: detailKerja?.tunjangan_lain?.split(", "),
    });

    const { receive } = this.state;
    const { dataTunjangan } = nextProps;
    if (dataTunjangan.length > 0 && !receive) {
      const tunjanganDataBiasa = dataTunjangan.filter((item) => item.type == 1);
      const tunjanganDataPrivilege = dataTunjangan.filter(
        (item) => item.type == 2
      );
      const tunjanganDataLain = dataTunjangan.filter((item) => item.type == 3);

      this.setState({
        tunjanganDataBiasa,
        tunjanganDataPrivilege,
        tunjanganDataLain,
        receive: true,
      });
    }
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
      mx_date,
      narahubung,
      office_name,
      tipe,
      posisi,
      tunjanganBiasa,
      tunjanganPrivilege,
      tunjanganOther,
      jatah_cuti,
      detail_cuti,
      tipe_karyawan,
      probation,
      gaji_pokok,
      unique_code,
      tunjangan,
      kop_code,
    } = this.state;

    let params = {
      signer_code: nama_signer,
      karyawan_code: nama_karyawan,
      date: date,
      narahubung: narahubung,
      office_name: office_name,
      tipe: tipe,
      posisi: posisi,
      tunjangan_biasa: tunjanganBiasa,
      tunjangan_privilege: tunjanganPrivilege,
      tunjangan_lain: tunjanganOther,
      jatah_cuti,
      detail_cuti,
      tipe_karyawan,
      probation,
      gaji_pokok,
      unique_code,
      tunjangan,
      max_response: mx_date,
      kop_code: kop_code,
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

  handleTipeKaryawan = (val) => {
    this.setState({
      tipe_karyawan: val.value,
    });
  };

  handleProbation = (val) => {
    this.setState({
      probation: val.value,
    });
  };

  handleJatahCuti = (val) => {
    this.setState({
      jatah_cuti: val.value,
    });
  };

  handleOffice = (val) => {
    this.setState({
      office_name: val.value,
    });
  };

  handleChangeItemBiaya = (e) => {
    let a = Number(e.target.value.replaceAll(",", "").replaceAll(".", ""));
    if (typeof a == "number") {
      this.setState({
        gaji_pokok: a,
      });
    }
  };

  handleChangeTunjangan = (e) => {
    let a = Number(e.target.value.replaceAll(",", "").replaceAll(".", ""));
    if (typeof a == "number") {
      this.setState({
        tunjangan: a,
      });
    }
  };

  handleDataJatahCuti = () => {
    var all = [];
    for (let i = 0; i <= 15; i++) {
      const element = {
        value: i,
        label: i + " hari",
      };
      all.push(element);
    }

    this.setState({
      dataJatahCuti: all,
    });
  };

  handleSetTunjanganList = () => {
    const { dataTunjangan } = this.props;
    console.warn("dtun", dataTunjangan);
  };

  handleTJBiasa = (event, index) => {
    let items = [...this.state.tunjanganDataBiasa];
    let item = { ...items[index] };
    item.checked = event.target.checked;
    items[index] = item;

    this.setState({
      tunjanganData: items,
    });

    var tj_biasa = this.state.tunjanganBiasa;
    if (event.target.checked) {
      tj_biasa.push(item.tj_code);
    } else {
      tj_biasa.splice(index, 1);
    }

    this.setState({
      tunjanganBiasa: tj_biasa,
    });
  };

  handleTJPrivilege = (event, index) => {
    let items = [...this.state.tunjanganDataPrivilege];
    let item = { ...items[index] };
    item.checked = event.target.checked;
    items[index] = item;

    this.setState({
      tunjanganDataPrivilege: items,
    });

    var tj = this.state.tunjanganPrivilege;
    if (event.target.checked) {
      tj.push(item.tj_code);
    }
    if (!event.target.checked) {
      // tj = tj.splice(index, 1);
      var idx = tj.indexOf(item.tj_code);
      if (idx !== -1) {
        tj.splice(idx, 1);
      }
    }

    this.setState({
      tunjanganPrivilege: tj,
    });
  };

  handleTJOther = (event, index) => {
    let items = [...this.state.tunjanganDataLain];
    let item = { ...items[index] };
    item.checked = event.target.checked;
    items[index] = item;

    this.setState({
      tunjanganDataLain: items,
    });

    var tj = this.state.tunjanganOther;
    if (event.target.checked) {
      tj.push(item.tj_code);
    }
    if (!event.target.checked) {
      // tj = tj.splice(index, 1);
      var idx = tj.indexOf(item.tj_code);
      if (idx !== -1) {
        tj.splice(idx, 1);
      }
    }

    this.setState({
      tunjanganOther: tj,
    });
  };

  goBack = () => {
    const { history } = this.props;

    history.goBack();
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
      v_date,
      narahubung,
      dataTipe,
      tipe,
      tipe_karyawan,
      office_name,
      posisi,
      dataTipeKaryawan,
      probation,
      gaji_pokok,
      dataJatahCuti,
      jatah_cuti,
      detail_cuti,
      tunjanganDataBiasa,
      tunjanganDataPrivilege,
      tunjanganDataLain,
      dataProbation,
      tunjangan,
      mx_date,
      kop_code,
    } = this.state;
    const { dataSigner, dataKaryawan, dataOffice, dataKop } = this.props;
    console.log(this.state);
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Edit Penerimaan Kerja">
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
                    className="w-full m-0"
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Hadir"
                    value={v_date}
                    onChange={this.handleDateChange}
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
                    className="w-full m-0"
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Maksimal Response"
                    value={mx_date}
                    onChange={this.handleMxDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item sm={12} xs={12}>
                <Grid item sm={6} xs={12}>
                  <TextValidator
                    variant="outlined"
                    className="w-full mb-3"
                    label="Narahubung"
                    onChange={this.handleChange}
                    type="text"
                    name="narahubung"
                    value={narahubung}
                    validators={["required"]}
                    errorMessages={["Field is Required"]}
                    size="small"
                  />
                </Grid>
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
                <InputLabel id="tipe_karyawan">Tipe Kerja</InputLabel>
                <Select
                  value={dataTipe?.filter((item) => item.value === tipe)}
                  name="tipe"
                  options={dataTipe}
                  onChange={this.handleTipe}
                  className="basic-multi-select mb-4"
                  placeholder="Tipe Kerja"
                  label="Tipe Kerja"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <InputLabel id="tipe_karyawan">Tipe Karyawan</InputLabel>
                <Select
                  value={dataTipeKaryawan?.filter(
                    (item) => item.value === tipe_karyawan
                  )}
                  name="tipe_karyawan"
                  options={dataTipeKaryawan}
                  onChange={this.handleTipeKaryawan}
                  className="basic-multi-select mb-4"
                  placeholder="Tipe Karyawan"
                  id="tipe_karyawan"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Gaji Pokok"
                  onChange={this.handleChangeItemBiaya}
                  type="text"
                  name="gaji_pokok"
                  value={formatHarga(gaji_pokok)}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Tunjangan transport, makan, dan lainnya"
                  onChange={this.handleChangeTunjangan}
                  type="text"
                  name="tunjangan"
                  value={formatHarga(tunjangan)}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <InputLabel id="tipe_karyawan">Probation</InputLabel>
                <Select
                  value={dataProbation?.filter(
                    (item) => item.value === probation
                  )}
                  name="probation"
                  options={dataProbation}
                  onChange={this.handleProbation}
                  className="basic-multi-select mb-4"
                  placeholder="Probation"
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <InputLabel id="tipe_karyawan">Cuti Tahunan</InputLabel>
                <Select
                  value={dataJatahCuti?.filter(
                    (item) => item.value === jatah_cuti
                  )}
                  name="jatah_cuti"
                  options={dataJatahCuti}
                  onChange={this.handleJatahCuti}
                  className="basic-multi-select mb-4"
                  placeholder="Cuti Tahunan"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <InputLabel id="tipe_karyawan">Detail Cuti</InputLabel>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label=""
                  onChange={this.handleChange}
                  type="text"
                  name="detail_cuti"
                  value={detail_cuti}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <div className="ml-1">
                  <h5>Fasilitas</h5>
                  {tunjanganDataPrivilege.map((data, index) => (
                    <FormControlLabel
                      label={data.tj_name}
                      control={
                        <Checkbox
                          checked={data.checked}
                          onChange={(event) =>
                            this.handleTJPrivilege(event, index)
                          }
                        />
                      }
                    />
                  ))}
                </div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <div className="ml-1">
                  <h5>Benefit Lain</h5>
                  {tunjanganDataLain.map((data, index) => (
                    <FormControlLabel
                      label={data.tj_name}
                      control={
                        <Checkbox
                          checked={data.checked}
                          onChange={(event) => this.handleTJOther(event, index)}
                        />
                      }
                    />
                  ))}
                </div>
              </Grid>
            </Grid>
            <br />
            <br />
            <div className="w-full text-right mt-20">
              <ButtonGroup className="mt-3">
                <Button
                  variant="contained"
                  color="default"
                  type="button"
                  onClick={this.goBack}
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
                    "Update"
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
    dataTunjangan: state.setting.dataTunjangan,
    detailKerja: state.penerimaan.detailKerja,
    dataKop: state.signer.dataKop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getKaryawan: (type) => dispatch(getKaryawan(type)),
    editPenerimaanKerja: (params) => dispatch(editPenerimaanKerja(params)),
    getTunjangan: (unique_code) => dispatch(getTunjangan(unique_code)),
    getOfficeList: () => dispatch(getOfficeList()),
    getDetailPenerimaanKerja: (unique_code) =>
      dispatch(getDetailPenerimaanKerja(unique_code)),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSuratPenerimaanKerja);
