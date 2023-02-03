import {
  Button,
  ButtonGroup,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
} from "@material-ui/core";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Select from "react-select";
import { getSigner } from "app/redux/actions/SignerActions";
import { getKaryawan } from "app/redux/actions/KaryawanActions";
import { addSP, checkSP } from "app/redux/actions/PeringatanAction";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getAllHeader } from "app/redux/actions/SignerActions";

class TambahSuratPeringatan extends Component {
  constructor() {
    super();
    this.state = {
      nama_signer: "",
      nama_karyawan: "",
      tgl_surat: new Date(),
      position: "",
      submit: 0,
      optionSigner: [],
      optionKaryawan: [],
      sp_ke: 0,
      karyawan_selected: false,
      msg: "",
      pelanggaran: "",
      dataBulan: [
        {
          label: "1 Bulan",
          value: 1,
        },
        {
          label: "2 Bulan",
          value: 2,
        },
        {
          label: "3 Bulan",
          value: 3,
        },
        {
          label: "4 Bulan",
          value: 4,
        },
        {
          label: "5 Bulan",
          value: 5,
        },
        {
          label: "6 Bulan",
          value: 6,
        },
        {
          label: "7 Bulan",
          value: 7,
        },
        {
          label: "8 Bulan",
          value: 8,
        },
        {
          label: "9 Bulan",
          value: 9,
        },
        {
          label: "10 Bulan",
          value: 10,
        },
        {
          label: "11 Bulan",
          value: 11,
        },
        {
          label: "12 Bulan",
          value: 12,
        },
      ],
      dateChecked: false,
      submitDsb: false,
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
    const { tgl_surat } = this.state;
    getSigner();
    getKaryawan(3);
    getAllHeader("list");

    let now = JSON.stringify(tgl_surat);
    now = now.slice(1, 11);

    this.setState({
      optionSigner: dataSigner,
      optionKaryawan: dataKaryawan,
      tgl_surat: now,
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
      pelanggaran,
      dateChecked,
      tgl_surat,
      sp_ke,
      sp_bulan,
      kop_code,
    } = this.state;

    let params = {
      signer_code: nama_signer,
      karyawan_code: nama_karyawan,
      pelanggaran: pelanggaran,
      is_tgl_surat: dateChecked,
      tgl_surat: tgl_surat,
      sp_ke: sp_ke,
      sp_bulan: sp_bulan,
      kop_code: kop_code,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { addSP, history } = this.props;
    addSP(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/surat_peringatan");
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

  handleChangeBulan = (val) => {
    this.setState({
      sp_bulan: val.value,
    });
  };

  handleChangeKaryawan = (val) => {
    this.setState(
      {
        nama_karyawan: val.value,
      },
      () => {
        const { checkSP } = this.props;
        checkSP(this.state.nama_karyawan).then((res) => {
          if (res.code === 0) {
            let sp_ke = res.data.sp_ke;
            let msg = "Karyawan akan mendapatkan SP-1";
            let submitDsb = false;
            if (sp_ke === 2) {
              msg = "Karyawan sudah mendapat SP-1 dan akan mendapatkan SP-2 !";
            } else if (sp_ke === 3) {
              msg =
                "Karyawan sudah mendapat SP-1 dan SP-2 dan akan mendapatkan SP-3 & PHK !";
            } else if (sp_ke === 0) {
              msg = "Karyawan sudah diberi SP-3 dan di PHK !";
              submitDsb = true;
            }

            this.setState({
              sp_ke: sp_ke,
              karyawan_selected: true,
              msg: msg,
              submitDsb: submitDsb,
            });
          }
        });
      }
    );
  };

  handleDateChange = (date) => {
    const event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tgl_surat: dateFormat,
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

  handleChangeChecked = (e) => {
    e.persist();
    const { dateChecked } = this.state;
    this.setState({
      [e.target.name]: !dateChecked,
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
      tgl_surat,
      pelanggaran,
      msg,
      sp_bulan,
      dataBulan,
      sp_ke,
      dateChecked,
      submitDsb,
      kop_code,
    } = this.state;
    const { dataSigner, dataKaryawan, dataKop } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Tambah Surat Peringatan">
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
                  defaultValue={nama_karyawan}
                  name="nama_karyawan"
                  options={dataKaryawan}
                  onChange={this.handleChangeKaryawan}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Karyawan *"
                />
                <FormHelperText>{msg}</FormHelperText>
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
              {sp_ke == 1 && (
                <>
                  <Grid item sm={6} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label="Pelanggaran"
                      type="text"
                      name="pelanggaran"
                      value={pelanggaran}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["Field is Required"]}
                      size="small"
                    />
                  </Grid>
                </>
              )}

              {sp_ke == 3 || sp_ke == 1 ? (
                <Grid item sm={6} xs={12} className="mb-3">
                  <Select
                    defaultValue={sp_bulan}
                    name="sp_bulan"
                    options={dataBulan}
                    onChange={this.handleChangeBulan}
                    className="basic-multi-select mb-4"
                    placeholder={
                      sp_ke == 1
                        ? "SP-1 Berlaku Selama *"
                        : "Kesalahan Dilakukan Selama *"
                    }
                  />
                </Grid>
              ) : (
                ""
              )}
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
                    label="Tanggal Surat *"
                    value={tgl_surat}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                    disabled={!dateChecked}
                  />
                </Grid>
                <Grid item sm={6} xs={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={dateChecked}
                        onChange={this.handleChangeChecked}
                        name="dateChecked"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    }
                    label="Custom Tanggal Surat"
                    style={{ marginTop: "20px" }}
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
                  color="default"
                  type="button"
                  disabled={submit}
                  onClick={() => window.history.back()}
                >
                  Batal
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submit || submitDsb}
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
    getKaryawan: (type) => dispatch(getKaryawan(type)),
    addSP: (params) => dispatch(addSP(params)),
    checkSP: (karyawan_code) => dispatch(checkSP(karyawan_code)),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TambahSuratPeringatan);
