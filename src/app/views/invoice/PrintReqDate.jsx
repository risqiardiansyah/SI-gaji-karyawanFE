import { Button, Dialog, Grid } from "@material-ui/core";
import {
  delLogPrint,
  downloadInvoice,
  updateStatusTermin,
} from "app/redux/actions/InvoiceActions";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, { Component } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class PrintReqDate extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      nama: "",
      deskripsi: "",
      mata_uang: "",
      saldo: 0,
      idx_buku_kas: "",
      termin: [],
      excellent: false,
      currency: "Rp",
      v_tanggal_dikirim: new Date(),
      v_tanggal_jatuh: new Date(),
    };
  }

  componentDidMount() {
    console.log("pepe", this.props);
    const {
      id_inv,
      index,
      email,
      excellent,
      tanggal_invoice,
      jatuh_tempo_invoice,
    } = this.props;
    this.setState({
      id_inv: id_inv,
      index: index,
      email: email,
      excellent: excellent,
      v_tanggal_dikirim: tanggal_invoice,
      v_tanggal_jatuh: jatuh_tempo_invoice,
    });
  }

  printData = (id_inv, index, email) => {
    Swal.fire({
      title: "Mohon Tunggu !",
      html: "Mengambil Data..", // add html attribute if you want or remove
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 7000,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const { downloadInvoice, excellent } = this.props;
    const { v_tanggal_dikirim, v_tanggal_jatuh } = this.state;

    let params = {
      jatuh_tempo_invoice: v_tanggal_jatuh,
      tgl_invoice: v_tanggal_dikirim,
    };
    if (excellent) {
      downloadInvoice(id_inv, "excellent", email, params).then((res) => {
        window.open(res.data.pdf_path);
        this.confirmAfterPrint(res.data.log_code);
      });
    } else {
      downloadInvoice(id_inv, index, email, params).then((res) => {
        window.open(res.data.pdf_path);
        this.confirmAfterPrint(res.data.log_code);
      });
    }

    this.props.handleClose();
  };

  confirmAfterPrint = (log_code) => {
    const { delLogPrint } = this.props;
    Swal.fire({
      title: "Berhasil",
      text: "Apakah File Tercetak Dengan Baik ?",
      showCancelButton: true,
      confirmButtonText: "Tidak, Hapus",
      cancelButtonText: "Ya",
      icon: "question",
      allowOutsideClick: false,
      confirmButtonColor: "#646464",
      cancelButtonColor: "#73be44",
    }).then((res) => {
      if (res.isConfirmed) {
        delLogPrint(log_code)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log("err", err);
            Swal.fire({
              title: "gagal",
              text: "Data Gagal dihapus",
              timer: 2000,
              icon: "error",
            });
          });
      }
    });
  };

  handleDateKirimChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal_dikirm: dateFormat,
      v_tanggal_dikirim: event,
    });
  };

  handleDateJatuhChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal_jatuh_tempo: dateFormat,
      v_tanggal_jatuh: event,
    });
  };

  render() {
    let { v_tanggal_dikirim, v_tanggal_jatuh } = this.state;
    let { open, handleClose } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
        <div className="p-5">
          <h4 className="mb-5">Tentukan Tanggal</h4>
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item sm={12} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Invoice"
                    value={v_tanggal_dikirim}
                    onChange={this.handleDateKirimChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Jatuh Tempo"
                    value={v_tanggal_jatuh}
                    onChange={this.handleDateJatuhChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </ValidatorForm>
          <div className="w-full text-right pt-5">
            <Button
              onClick={() =>
                this.printData(
                  this.props.id_inv,
                  this.props.index,
                  this.props.email
                )
              }
              variant="contained"
              color="primary"
            >
              Print
            </Button>
            <Button onClick={handleClose} variant="contained" color="default">
              Batal
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    downloadInvoice: (invoice_code, index, email, params) =>
      dispatch(downloadInvoice(invoice_code, index, email, params)),
    updateStatusTermin: (params) => dispatch(updateStatusTermin(params)),
    delLogPrint: (code) => dispatch(delLogPrint(code)),
  };
};

export default connect(null, mapDispatchToProps)(PrintReqDate);
