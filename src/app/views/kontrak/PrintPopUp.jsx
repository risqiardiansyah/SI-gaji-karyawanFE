import {
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from "@material-ui/core";
import {
  downloadInvoice,
  updateStatusTermin,
} from "app/redux/actions/InvoiceActions";
import { formatRupiah, konversiRomawi } from "app/utils/globalFunction";
import React, { Component } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class PrintPopup extends Component {
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
    };
  }

  componentDidMount() {
    const { termin, excellent } = this.props;
    this.setState({
      termin: termin,
      excellent: excellent,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateTerm = (index, id, status) => {
    const { termin } = this.state;
    const { updateStatusTermin } = this.props;
    let newStatus = status == 0 ? 1 : 0;
    let newTermin = termin;
    let params = {
      idx_term: id,
      status: newStatus,
    };

    updateStatusTermin(params);

    newTermin[index]["status"] = newStatus;

    this.setState({
      termin: newTermin,
    });
  };

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
    const { downloadInvoice } = this.props;
    const { excellent } = this.state;
    if (excellent) {
      downloadInvoice(id_inv, "excellent", email).then((res) => {
        window.open(res.data.pdf_path);
      });
    } else {
      downloadInvoice(id_inv, index, email).then((res) => {
        window.open(res.data.pdf_path);
      });
    }
  };

  render() {
    let { termin, excellent } = this.state;
    let { open, handleClose } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth={true}>
        <div className="p-5">
          <h4 className="mb-5">Pilih Termin Yang ingin Ditagih</h4>
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Table className="crud-table">
                  <TableHead className="bg-primary">
                    <TableRow>
                      <TableCell className="py-2 text-center font-poppins font-bold text-white pl-2">
                        Pembayaran
                      </TableCell>
                      <TableCell className="py-2 text-center font-poppins font-bold text-white pl-2">
                        Total Tagihan
                      </TableCell>
                      <TableCell className="py-2 text-center font-poppins font-bold text-white pl-2">
                        Status
                      </TableCell>
                      <TableCell
                        className="py-2 text-center font-poppins font-bold text-white pl-2"
                        align="right"
                        colSpan={2}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="mt-2">
                    {termin.map((item, index) => (
                      <TableRow hover>
                        <TableCell className="font-poppins p-" align="center">
                          Termin {konversiRomawi(item.term_number)}
                          {index == 0 ? " / DP" : ""}
                        </TableCell>
                        <TableCell className="font-poppins p-1" align="center">
                          {formatRupiah(item.nominal, "Rp. ")}
                        </TableCell>
                        <TableCell className="font-poppins p-1" align="center">
                          <Chip
                            label={item.status == 0 ? "UNPAID" : "PAID"}
                            size="small"
                            color={item.status == 0 ? "error" : "primary"}
                          />
                        </TableCell>
                        <TableCell
                          className="font-poppins pt-0"
                          align="right"
                          colSpan={2}
                        >
                          <ButtonGroup aria-label="group" className="mt-3">
                            <Button
                              variant="contained"
                              className={"text-white elevation-z0 bg-primary"}
                              onClick={() =>
                                this.updateTerm(
                                  index,
                                  item.idx_term,
                                  item.status
                                )
                              }
                              size="small"
                            >
                              Edit Status
                            </Button>
                            <Button
                              variant="contained"
                              className={"text-white elevation-z0 bg-secondary"}
                              onClick={() =>
                                this.printData(item.invoice_code, index + 1, 0)
                              }
                              size="small"
                            >
                              Print
                            </Button>
                            <Button
                              variant="contained"
                              className={"text-white elevation-z0 bg-primary"}
                              onClick={() =>
                                this.printData(item.invoice_code, index + 1, 1)
                              }
                              size="small"
                            >
                              Send Email
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </ValidatorForm>
          <div className="w-full text-right pt-5">
            <Button onClick={handleClose} variant="contained" color="default">
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    downloadInvoice: (invoice_code, index, email) =>
      dispatch(downloadInvoice(invoice_code, index, email)),
    updateStatusTermin: (params) => dispatch(updateStatusTermin(params)),
  };
};

export default connect(null, mapDispatchToProps)(PrintPopup);
