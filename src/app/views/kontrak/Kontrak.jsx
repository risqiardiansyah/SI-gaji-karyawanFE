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
// import { formatRupiah } from 'app/utils/globalFunction';
import { SimpleCard } from "matx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  getKontrak,
  delKontrak,
  downloadKontrak,
} from "app/redux/actions/KontrakActions";

import { formatTanggal } from "app/utils/globalFunction";
import PrintPopUp from "./PrintPopUp";

class Kontrak extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      search: "",
      page: 0,
      rowsPerPage: 10,
      openDetail: false,
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
    const { getKontrak } = this.props;
    getKontrak();
  }

  handleDelete = (id) => {
    const { delKontrak, getKontrak } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        delKontrak(id)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getKontrak();
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

  handlePrint = (item, email) => {
    const { downloadKontrak } = this.props;
    const params = {
      no_surat: item.no_surat,
      unique_code: item.unique_code,
    };
    Swal.fire({
      title: "Mohon Tunggu !",
      html: "Mengambil Data..",
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: true,
      onBeforeOpen: () => {
        Swal.showLoading();
        downloadKontrak(params, email).then((res) => {
          window.open(res.data.pdf_path);
          Swal.close();
        });
      },
    });
  };

  renderTable = () => {
    const { page, rowsPerPage, search } = this.state;
    const { dataKontrak } = this.props;
    return dataKontrak?.length > 0 ? (
      dataKontrak
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter((item) =>
          item.karyawan_nama?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell className="pl-2" colSpan={2}>
              {item.no_surat}
            </TableCell>
            <TableCell>{item.karyawan_nama}</TableCell>
            <TableCell>{item.posisi}</TableCell>
            <TableCell>{formatTanggal(item.created_at)}</TableCell>
            <TableCell>{item.penanggung_jawab}</TableCell>
            <TableCell align="center" colSpan={3}>
              <ButtonGroup aria-label="group">
                <Button
                  onClick={() => this.handlePrint(item, 0)}
                  variant="contained"
                  className="bg-primary text-white elevation-z0"
                >
                  View Pdf
                </Button>
                <Button
                  onClick={() => this.handlePrint(item, 1)}
                  variant="contained"
                  className="bg-secondary text-white elevation-z0"
                >
                  Send Email
                </Button>
                <Button
                  onClick={() => this.handleDelete(item.unique_code)}
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
        <TableCell colSpan={10} align="center">
          {" "}
          Data kosong{" "}
        </TableCell>
      </TableRow>
    );
  };

  handleAdd = (type) => {
    const { history } = this.props;
    history.push("/tambah/kontrak");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { search, page, rowsPerPage } = this.state;
    const { dataKontrak } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard
          loading={false}
          title="Kontrak"
          subtitle="Data Kontrak"
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
                    Tambah Kontrak
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
                    <TableCell className="pl-2" colSpan={2}>
                      Nomor Surat
                    </TableCell>
                    <TableCell>Nama Karyawan</TableCell>
                    <TableCell>Posisi</TableCell>
                    <TableCell>Tanggal Dibuat</TableCell>
                    <TableCell>Penanggung Jawab</TableCell>
                    <TableCell align="center" colSpan={3}>
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
                count={dataKontrak?.length ? dataKontrak?.length : 0}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataKontrak: state.kontrak.data,
    state: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getKontrak: () => dispatch(getKontrak()),
    delKontrak: (params) => dispatch(delKontrak(params)),
    downloadKontrak: (params, email) =>
      dispatch(downloadKontrak(params, email)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Kontrak);
