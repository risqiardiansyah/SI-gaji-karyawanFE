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
import { formatRupiah, formatTanggal } from "app/utils/globalFunction";
import {
  getAllSlipGaji,
  delSlip,
  downloadSlip,
  sendEmailSlip
} from "app/redux/actions/KaryawanActions";

class SlipGaji extends Component {
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
    const { getAllSlipGaji } = this.props;
    getAllSlipGaji();
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
    const { delSlip, getAllSlipGaji } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        delSlip(id)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getAllSlipGaji();
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

  handleEdit = (param, karyawan_code) => {
    window.location.href = `/slip_gaji/edit/${param}/${karyawan_code}`;
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
    const { downloadSlip } = this.props;

    downloadSlip(item.slip_code).then((res) => {
      window.open(res.data.pdf_path);
    });
  };

  handleSendEmail = (item) => {
    Swal.fire({
      title: "Mohon Tunggu !",
      html: "Mengirimkan Email..",
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 15000,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const { sendEmailSlip } = this.props;

    sendEmailSlip(item.slip_code).then((res) => {
      Swal.fire({
        title: "Berhasil",
        text: "Slip Gaji berhasil dikirim",
        timer: 2000,
        icon: "success",
      });
    });
  };

  renderTable = () => {
    const { page, rowsPerPage, search } = this.state;
    const { dataSlip } = this.props;

    return dataSlip?.length > 0 ? (
      dataSlip
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
              <TableCell colSpan={2}>{formatRupiah(item.gaji_total)}</TableCell>
              <TableCell colSpan={2}>{item.bulan}</TableCell>
              <TableCell colSpan={2}>{formatTanggal(item.tgl_slip)}</TableCell>
              <TableCell align="center" colSpan={3}>
                <ButtonGroup aria-label="group">
                  <Button
                    onClick={() =>
                      this.handleEdit(item.slip_code, item.karyawan_code)
                    }
                    variant="contained"
                    className="bg-primary text-white elevation-z0"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => this.handlePrint(item)}
                    variant="contained"
                    className="bg-secondary text-white elevation-z0"
                    size="small"
                  >
                    View Pdf
                  </Button>
                  <Button
                    onClick={() => this.handleSendEmail(item)}
                    variant="contained"
                    className="bg-light-primary text-black elevation-z0"
                    size="small"
                  >
                    Send Email
                  </Button>

                  <Button
                    onClick={() => this.handleDelete(item.slip_code)}
                    variant="contained"
                    className="bg-error text-white elevation-z0"
                    size="small"
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
    history.push("/slip_gaji/tambah");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { search, page, rowsPerPage } = this.state;
    const { dataSlip } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard
          loading={false}
          title="Slip Gaji"
          subtitle="Data Slip Gaji Karyawan"
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
                    Tambah Slip Gaji
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
                    <TableCell colSpan={2}>Pendapatan Bersih</TableCell>
                    <TableCell colSpan={2}>Bulan</TableCell>
                    <TableCell colSpan={2}>Tanggal Slip</TableCell>
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
                count={dataSlip?.length ? dataSlip?.length : 0}
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
    dataSlip: state.karyawan.dataSlip,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllSlipGaji: () => dispatch(getAllSlipGaji()),
    delSlip: (params) => dispatch(delSlip(params)),
    downloadSlip: (slip_code) => dispatch(downloadSlip(slip_code)),
    sendEmailSlip: (slip_code) => dispatch(sendEmailSlip(slip_code)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SlipGaji);
