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
import { SimpleCard } from "matx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  getAllSuperMagang,
  delSuperMagang,
  downloadSuperMagang,
} from "app/redux/actions/SuperActions";

import { formatTanggal } from "app/utils/globalFunction";

class SuperMagang extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      search: "",
      page: 0,
      rowsPerPage: 10,
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
    const { getAllSuperMagang } = this.props;
    getAllSuperMagang();
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
    const { delSuperMagang, getAllSuperMagang } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        const params = {
          sm_code: id,
        };
        delSuperMagang(params)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getAllSuperMagang();
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
    const { downloadSuperMagang } = this.props;
    const params = {
      signer_code: item.signer_code,
      karyawan_code: item.karyawan_code,
      sm_code: item.sm_code,
    };
    Swal.fire({
      title: "Mohon Tunggu !",
      html: "Mengambil Data..",
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: true,
      onBeforeOpen: () => {
        Swal.showLoading();
        downloadSuperMagang(params, email).then((res) => {
          window.open(res.data.pdf_path);
          Swal.close();
        });
      },
    });
  };

  renderTable = () => {
    const { page, rowsPerPage, search } = this.state;
    const { dataMagang } = this.props;

    return dataMagang?.length > 0 ? (
      dataMagang
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(
          (item) =>
            item.karyawan_nama?.toLowerCase().includes(search.toLowerCase()) ||
            item.signer_name?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell className="pl-2">{index + 1}</TableCell>
            <TableCell colSpan={2}>{item.karyawan_nama}</TableCell>
            <TableCell colSpan={2}>{item.signer_name}</TableCell>
            <TableCell colSpan={2}>{formatTanggal(item.created_at)}</TableCell>
            {/* <TableCell>
              {item.bahasa === 'eng' ? 'English' : 'Indonesia'}
            </TableCell> */}
            <TableCell align="center" colSpan={3}>
              <ButtonGroup aria-label="group">
                <Button
                  onClick={() => this.handlePrint(item, 0)}
                  variant="contained"
                  className="bg-primary text-white elevation-z0"
                  size="small"
                >
                  View Pdf
                </Button>
                <Button
                  onClick={() => this.handlePrint(item, 1)}
                  variant="contained"
                  className="bg-secondary text-white elevation-z0"
                  size="small"
                >
                  Send Email
                </Button>
                <Button
                  onClick={() => this.handleDelete(item.sm_code)}
                  variant="contained"
                  className="bg-error text-white elevation-z0"
                  size="small"
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

  handleAdd = () => {
    const { history } = this.props;
    history.push("/tambah/super_magang");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { search, page, rowsPerPage } = this.state;
    const { dataMagang } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard
          loading={false}
          title="Super Karyawan Magang"
          subtitle="Data Surat Pernyataan Karyawan Magang"
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
                    onClick={() => this.handleAdd()}
                    variant="contained"
                    color="primary"
                    className="elevation-z0 font-medium"
                  >
                    Tambah Super Magang
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
                    <TableCell className="pl-2">No</TableCell>
                    <TableCell colSpan={2}>Nama Karyawan Magang</TableCell>
                    <TableCell colSpan={2}>Nama Signer</TableCell>
                    <TableCell colSpan={2}>Tanggal Dibuat</TableCell>
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
                count={dataMagang?.length ? dataMagang?.length : 0}
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
    dataMagang: state.super.dataMagang,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllSuperMagang: () => dispatch(getAllSuperMagang()),
    delSuperMagang: (params) => dispatch(delSuperMagang(params)),
    downloadSuperMagang: (params, email) =>
      dispatch(downloadSuperMagang(params, email)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SuperMagang);
