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
  getPerjanjianKontrak,
  delPerjanjianKontrak,
  downloadPerjanjianKontrak,
} from "app/redux/actions/PerjanjianAction";
import DetailPerjanjian from "./DetailPerjanjian";

class PerjanjianKontrak extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      search: "",
      page: 0,
      rowsPerPage: 10,
      dataDetailKerjasama: {},
      modalDetail: false,
      openDetail: false,
      printPopUp: false,
      bahasa: "",
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
    const { getPerjanjianKontrak } = this.props;
    getPerjanjianKontrak();
  }

  handleDelete = (id) => {
    const { delPerjanjianKontrak, getPerjanjianKontrak } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        delPerjanjianKontrak(id)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getPerjanjianKontrak();
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

  handleEdit = (param) => {
    const { history } = this.props;
    history.push(`/perjanjian_kontrak/${param}/edit`);
  };

  handleViewPdf = (item, send_email) => {
    Swal.fire({
      title: "Mohon Tunggu !",
      html: "Mengambil Data..",
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 7000,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const { downloadPerjanjianKontrak } = this.props;

    downloadPerjanjianKontrak(item.unique_code, send_email).then((res) => {
      window.open(res.data.pdf_path);
    });
  };

  handleModalDetail = (data) => {
    this.setState({
      modalDetail: true,
      dataEdit: data,
    });
  };

  handleClose = () => {
    this.setState({ modalDetail: false });
  };

  renderTable = () => {
    const { page, rowsPerPage, search } = this.state;
    const { dataPerjanjian = [] } = this.props;
    return dataPerjanjian?.length > 0 ? (
      dataPerjanjian
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(
          (item) =>
            item.karyawan_name?.toLowerCase().includes(search.toLowerCase()) ||
            item.signer_name?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell className="pl-2">{index + 1}</TableCell>
            <TableCell colSpan={2}>
              {!item.karyawan_name ? "Tidak di temukan" : item.karyawan_name}
            </TableCell>
            <TableCell colSpan={2}>{item.signer_name}</TableCell>
            <TableCell align="center" colSpan={3}>
              <ButtonGroup aria-label="group">
                <Button
                  onClick={() => this.handleEdit(item.unique_code)}
                  variant="contained"
                  className="bg-primary text-white elevation-z0"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => this.handleViewPdf(item, 0)}
                  variant="contained"
                  className="bg-secondary text-white elevation-z0"
                >
                  View Pdf
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
        <TableCell colSpan={8} align="center">
          {" "}
          Data kosong{" "}
        </TableCell>
      </TableRow>
    );
  };

  handleAdd = () => {
    const { history } = this.props;
    history.push("/perjanjian_kontrak/tambah");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { search, modalDetail, page, rowsPerPage, dataEdit, excellent } =
      this.state;

    const { dataPerjanjian, match } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard
          loading={false}
          title="Surat Perjanjian Kerja"
          subtitle="Data Surat Perjanjian Kerja"
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
                    Tambah Perjanjian Kerja
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
                    <TableCell className="pl-2">No.</TableCell>
                    <TableCell colSpan={2}>Nama Karyawan</TableCell>
                    <TableCell colSpan={2}>Nama Signer</TableCell>
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
                count={dataPerjanjian?.length ? dataPerjanjian?.length : 0}
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

        {modalDetail && (
          <DetailPerjanjian
            dataEdit={dataEdit}
            open={modalDetail}
            excellent={excellent}
            handleClose={this.handleClose}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataPerjanjian: state.perjanjian.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPerjanjianKontrak: () => dispatch(getPerjanjianKontrak()),
    delPerjanjianKontrak: (params) => dispatch(delPerjanjianKontrak(params)),
    downloadPerjanjianKontrak: (unique_code, email) =>
      dispatch(downloadPerjanjianKontrak(unique_code, email)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PerjanjianKontrak);
