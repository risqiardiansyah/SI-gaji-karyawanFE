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
import { formatTanggal } from "app/utils/globalFunction";
import {
  getAllSertifikat,
  delSertifikat,
  downloadSertifikat,
} from "app/redux/actions/SuketAction";

class Sertifikat extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      search: "",
      page: 0,
      rowsPerPage: 10,
      dataLanguage: [
        {
          label: "Indonesia",
          value: "ind",
        },
        {
          label: "English",
          value: "eng",
        },
      ],
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
    const { getAllSertifikat } = this.props;
    getAllSertifikat();
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
    const { delSertifikat, getAllSertifikat } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        delSertifikat(id)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getAllSertifikat();
            }
          })
          .catch((err) => {
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
    window.location.href = `/sertifikat/edit/${param}`;
  };

  handlePrint = (item) => {
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
    const { downloadSertifikat } = this.props;

    downloadSertifikat(item.sertifikat_code).then((res) => {
      window.open(res.data.pdf_path);
    });
  };

  renderTable = () => {
    const { page, rowsPerPage, search } = this.state;
    const { dataSertifikat } = this.props;

    return dataSertifikat?.length > 0 ? (
      dataSertifikat
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(
          (item) =>
            item.karyawan_nama?.toLowerCase().includes(search.toLowerCase()) ||
            item.signer_name?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => {
          return (
            <TableRow hover key={index}>
              <TableCell className="pl-2">{index + 1}</TableCell>
              <TableCell colSpan={2}>{item.karyawan_nama}</TableCell>
              <TableCell colSpan={2}>{item.signer_name}</TableCell>
              <TableCell colSpan={2}>
                {formatTanggal(item.created_at)}
              </TableCell>
              <TableCell>{item.posisi}</TableCell>
              <TableCell align="center" colSpan={3}>
                <ButtonGroup aria-label="group">
                  <Button
                    onClick={() => this.handleEdit(item.sertifikat_code)}
                    variant="contained"
                    className="bg-primary text-white elevation-z0"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => this.handlePrint(item)}
                    variant="contained"
                    className="bg-secondary text-white elevation-z0"
                  >
                    View Pdf
                  </Button>

                  <Button
                    onClick={() => this.handleDelete(item.sertifikat_code)}
                    variant="contained"
                    className="bg-error text-white elevation-z0"
                  >
                    Hapus
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          );
        })
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
    history.push("/sertifikat/tambah");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { search, page, rowsPerPage } = this.state;
    const { dataSertifikat } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard
          loading={false}
          title="Sertifikat"
          subtitle="Data Sertifikat Magang Kerja"
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
                    Tambah Sertifikat
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
                    <TableCell colSpan={2}>Nama</TableCell>
                    <TableCell colSpan={2}>Signer</TableCell>
                    <TableCell colSpan={2}>Tanggal Dibuat</TableCell>
                    <TableCell>Position</TableCell>
                    {/* <TableCell>Bahasa</TableCell> */}

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
                count={dataSertifikat?.length ? dataSertifikat?.length : 0}
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
    dataSertifikat: state.suket.sertifikat,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllSertifikat: () => dispatch(getAllSertifikat()),
    delSertifikat: (params) => dispatch(delSertifikat(params)),
    downloadSertifikat: (sertifikat_code) =>
      dispatch(downloadSertifikat(sertifikat_code)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sertifikat);
