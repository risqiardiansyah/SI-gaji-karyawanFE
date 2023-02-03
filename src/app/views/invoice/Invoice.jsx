import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import { formatRupiah } from "app/utils/globalFunction";
import { SimpleCard } from "matx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { getInvoice, delInvoice } from "app/redux/actions/InvoiceActions";

import { formatTanggal } from "app/utils/globalFunction";
import PrintPopUp from "./PrintPopUp";
// import { Link } from "react-router-dom";

class Invoice extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      search: "",
      page: 0,
      rowsPerPage: 10,
      openDetail: false,
      printPopUp: false,
      dataTermin: [],
      invoice_code: 0,
      excellent: false,
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
    this.getData();
  }
  getData() {
    const { getInvoice } = this.props;
    getInvoice();
  }
  handleCloseEdit = () => {
    this.setState(
      {
        printPopUp: false,
      },
      () => {
        this.getData();
      }
    );
  };

  handleDelete = (id) => {
    const { delInvoice, getInvoice } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        delInvoice(id)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getInvoice();
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

  handlePrint = (item) => {
    if (item.model_pembayaran == "excellent") {
      let termin = [
        {
          term_number: 1,
          nominal: item.jumlah_tagihan,
          invoice_code: item.invoice_code,
          status: item.status,
          idx_term: item.invoice_code,
        },
      ];
      this.setState({
        printPopUp: true,
        dataTermin: termin,
        invoice_code: item.invoice_code,
        excellent: true,
        currency: item.currency,
        tanggal_invoice: item.tanggal_invoice,
        jatuh_tempo_invoice: item.jatuh_tempo_invoice,
      });
    } else {
      this.setState({
        printPopUp: true,
        dataTermin: item.termin,
        invoice_code: item.invoice_code,
        excellent: false,
        currency: item.currency,
        tanggal_invoice: item.tanggal_invoice,
        jatuh_tempo_invoice: item.jatuh_tempo_invoice,
      });
    }
  };

  renderTable = () => {
    const { page, rowsPerPage, search } = this.state;
    const { dataInvoice = [] } = this.props;
    return dataInvoice?.length > 0 ? (
      dataInvoice
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter((item) =>
          item.pelanggan?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell className="pl-2">{item.nomor_surat}</TableCell>
            <TableCell>{item.pelanggan}</TableCell>
            <TableCell>{formatTanggal(item.tanggal_invoice)}</TableCell>
            <TableCell>{formatTanggal(item.jatuh_tempo_invoice)}</TableCell>
            <TableCell>
              {formatRupiah(item.jumlah_tagihan, item.currency)}
            </TableCell>
            <TableCell align="center" colSpan={2}>
              <ButtonGroup aria-label="group">
                <Button
                  onClick={() => this.handlePrint(item)}
                  variant="contained"
                  className="bg-primary text-white elevation-z0"
                >
                  Lihat Termin
                </Button>
                {/* <Link to={`/invoice/edit/${item.invoice_code}`}>
                <Button
                  variant="contained"
                  className="bg-primary text-white elevation-z0"
                >
                  Edit
                </Button>
              </Link> */}
                <Button
                  onClick={() => this.handleDelete(item.invoice_code)}
                  variant="contained"
                  className="bg-error text-white elevation-z0"
                >
                  Hapus
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))
    ) : (
      <TableRow hover>
        <TableCell colSpan={6} align="center">
          {" "}
          Data kosong{" "}
        </TableCell>
      </TableRow>
    );
  };

  handleAdd = (type) => {
    const { history } = this.props;
    history.push("/tambah/invoice");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      search,
      page,
      rowsPerPage,
      printPopUp,
      dataTermin,
      invoice_code,
      excellent,
      currency,
      tanggal_invoice,
      jatuh_tempo_invoice,
    } = this.state;
    const { dataInvoice } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard
          loading={false}
          title="Invoice"
          subtitle="Data Invoice"
          currency=""
          saldo=""
        >
          <Fragment>
            <Grid
              container
              spacing={2}
              justify="space-between"
              className="my-4"
            >
              <Grid item lg={5} md={5} sm={12} xs={12} className="mb-4">
                <ButtonGroup aria-label="group">
                  <Button
                    onClick={() => this.handleAdd(1)}
                    variant="contained"
                    color="primary"
                    className="elevation-z0 font-medium"
                  >
                    Tambah Invoice
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <div className="flex items-center">
                  <TextField
                    variant="standard"
                    className="w-full"
                    placeholder="Cari"
                    onChange={this.handleChange}
                    value={search}
                    name="search"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon>search</Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </Grid>
            </Grid>
            <div className="w-full overflow-auto bg-white">
              <Table className="buku-kas-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="pl-2">Nomor Invoice</TableCell>
                    <TableCell>Pelanggan</TableCell>
                    <TableCell>Tanggal Dibuat</TableCell>
                    <TableCell>Jatuh Tempo</TableCell>
                    <TableCell>Jumlah Pembayaran</TableCell>
                    <TableCell align="center" colSpan={2}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTable()}</TableBody>
              </Table>
              <TablePagination
                className="px-16"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dataInvoice?.length ? dataInvoice?.length : 0}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={"From"}
                page={page}
                backIconButtonProps={{
                  "aria-label": "Previous page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next page",
                }}
                backIconButtonText="Previous page"
                nextIconButtonText="Next page"
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.setRowsPerPage}
              />
            </div>
          </Fragment>
        </SimpleCard>
        {printPopUp && (
          <PrintPopUp
            termin={dataTermin}
            invoice_code={invoice_code}
            open={printPopUp}
            excellent={excellent}
            currency={currency}
            tanggal_invoice={tanggal_invoice}
            jatuh_tempo_invoice={jatuh_tempo_invoice}
            handleClose={this.handleCloseEdit}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataInvoice: state.invoice.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getInvoice: () => dispatch(getInvoice()),
    delInvoice: (params) => dispatch(delInvoice(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
