import { Button, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import Select from "react-select";
import { getSigner } from "app/redux/actions/SignerActions";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  editGaransi,
  getDetailGaransi,
} from "app/redux/actions/KontrakActions";
import { getPelanggan } from "app/redux/actions/PelangganActions";
import { getAllHeader } from "app/redux/actions/SignerActions";

class EditGaransi extends Component {
  constructor() {
    super();
    this.state = {
      nama_signer: "",
      nama_pelanggan: "",
      submit: 0,
      v_tanggal: new Date(),
      optionSigner: [],
      optionKaryawan: [],
      dataLanguage: [
        {
          label: "Indonesia",
          value: "id",
        },
        {
          label: "English",
          value: "en",
        },
      ],
      bahasa: "",
    };
  }

  componentDidMount() {
    const {
      getSigner,
      dataSigner,
      getPelanggan,
      dataPelanggan,
      getDetailGaransi,
      match,
      getAllHeader,
    } = this.props;
    const { v_tanggal } = this.state;
    getSigner();
    getPelanggan();
    getDetailGaransi(match.params.id);
    getAllHeader("list");

    let mulai = JSON.stringify(v_tanggal);
    mulai = mulai.slice(1, 11);

    this.setState({
      optionSigner: dataSigner,
      optionKaryawan: dataPelanggan,
      tanggal: mulai,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("np", nextProps);
    const detailGaransi = nextProps.detailGaransi;

    if (detailGaransi?.signer_code) {
      this.setState({
        nama_signer: detailGaransi.signer_code,
        nama_pelanggan: detailGaransi.pelanggan_code,
        v_tanggal: detailGaransi.tgl_surat,
        bahasa: detailGaransi.lang,
        kop_code: detailGaransi.kop_code,
      });
    }
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
    const { nama_signer, tanggal, nama_pelanggan, bahasa, kop_code } =
      this.state;

    let params = {
      unique_code: this.props.match.params.id,
      signer_code: nama_signer,
      pelanggan_code: nama_pelanggan,
      tgl_surat: tanggal,
      lang: bahasa,
      kop_code: kop_code,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { editGaransi, history } = this.props;
    editGaransi(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/surat_garansi");
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

  handleDate = (date) => {
    const event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal: dateFormat,
      v_tanggal: event,
    });
  };

  handleChangeSigner = (val) => {
    this.setState({
      nama_signer: val.value,
    });
  };

  handleChangePelanggan = (val) => {
    this.setState({
      nama_pelanggan: val.value,
    });
  };

  handleLanguage = (val) => {
    this.setState({
      bahasa: val.value,
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
      v_tanggal,
      submit,
      nama_pelanggan,
      bahasa,
      dataLanguage,
      kop_code,
    } = this.state;
    const { dataSigner, dataPelanggan, dataKop } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Edit Surat Garansi">
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
                  value={dataSigner.filter((item) => item.value == nama_signer)}
                  name="nama_signer"
                  options={dataSigner}
                  onChange={this.handleChangeSigner}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Signer *"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  value={dataPelanggan.filter(
                    (item) => item.value == nama_pelanggan
                  )}
                  name="nama_pelanggan"
                  options={dataPelanggan}
                  onChange={this.handleChangePelanggan}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Pelanggan *"
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
                    label="Tanggal Surat *"
                    value={v_tanggal}
                    onChange={this.handleDate}
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
                  value={dataLanguage.filter((item) => item.value == bahasa)}
                  name="bahasa"
                  options={dataLanguage}
                  onChange={this.handleLanguage}
                  className="basic-multi-select mb-4"
                  placeholder="Bahasa"
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
    dataPelanggan: state.pelanggan.data,
    detailGaransi: state.kontrak.detailGaransi,
    dataKop: state.signer.dataKop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getPelanggan: () => dispatch(getPelanggan()),
    editGaransi: (params) => dispatch(editGaransi(params)),
    getDetailGaransi: (unique_code) => dispatch(getDetailGaransi(unique_code)),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditGaransi);
