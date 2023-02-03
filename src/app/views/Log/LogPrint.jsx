import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { SimpleCard } from "matx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { delLogPrint, getLogPrint } from "app/redux/actions/InvoiceActions";

import { formatTanggal } from "app/utils/globalFunction";
import PrintPopUp from "../invoice/PrintPopUp";

class LogPrint extends Component {
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
    const { getLogPrint } = this.props;
    const { type, code, termin } = this.props.match.params;
    getLogPrint(type, code, termin);
  }

  handleDelete = (id) => {
    const { delLogPrint, getLogPrint } = this.props;
    const { type, code, termin } = this.props.match.params;

    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        delLogPrint(id)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getLogPrint(type, code, termin);
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

  renderTable = () => {
    const { page, rowsPerPage } = this.state;
    const { logPrint = [] } = this.props;
    return logPrint?.length > 0 ? (
      logPrint
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell className="pl-2">{index + 1}</TableCell>
            <TableCell>{item.type_surat}</TableCell>
            <TableCell>{formatTanggal(item.created_at)}</TableCell>
            <TableCell>{item.send_email == 1 ? "Yes" : "No"}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell align="center" colSpan={2}>
              <ButtonGroup aria-label="group">
                <Button
                  onClick={() => this.handleLink(item.url)}
                  variant="contained"
                  className="bg-primary text-white elevation-z0"
                >
                  Lihat File
                </Button>
                <Button
                  onClick={() => this.handleDelete(item.code)}
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLink = (path) => {
    window.open(path);
  };

  render() {
    const {
      page,
      rowsPerPage,
      printPopUp,
      dataTermin,
      invoice_code,
      excellent,
      currency,
    } = this.state;
    const { logPrint, match } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard
          loading={false}
          title={`Log Print Surat ${match.params.type}`}
          subtitle=""
          back={true}
        >
          <Fragment>
            <div className="w-full overflow-auto bg-white">
              <Table className="buku-kas-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="pl-2">No.</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Tanggal Dibuat</TableCell>
                    <TableCell>Send Email</TableCell>
                    <TableCell>Created By</TableCell>
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
                count={logPrint?.length ? logPrint?.length : 0}
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
            handleClose={this.handleCloseEdit}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logPrint: state.invoice.logPrint,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getLogPrint: (type, code, termin) =>
      dispatch(getLogPrint(type, code, termin)),
    delLogPrint: (params) => dispatch(delLogPrint(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogPrint);
