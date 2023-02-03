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
import { getMOM, delMOM, downloadMOM } from "app/redux/actions/MOMActions";

class MOM extends Component {
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
    const { getMOM } = this.props;
    getMOM();
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
    const { delMOM, getMOM } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        delMOM(id)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getMOM();
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

  handleEdit = (code) => {
    window.location.href = `/mom/edit/${code}`;
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
    const { downloadMOM } = this.props;

    downloadMOM({}, 0, item.mom_code).then((res) => {
      window.open(res.data.pdf_path);
    });
  };

  renderTable = () => {
    const { page, rowsPerPage, search } = this.state;
    const { dataMOM } = this.props;

    return dataMOM?.length > 0 ? (
      dataMOM
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(
          (item) =>
            item.tempat?.toLowerCase().includes(search.toLowerCase()) ||
            item.no_surat?.toLowerCase().includes(search.toLowerCase()) ||
            item.nama_perusahaan?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => {
          return (
            <TableRow hover key={index}>
              <TableCell colSpan={3}>{item.no_surat}</TableCell>
              <TableCell colSpan={2}>
                {formatTanggal(item.tgl)} <br />
                {item.jam_mulai?.slice(0, 5)} - {item.jam_selesai?.slice(0, 5)}
              </TableCell>
              <TableCell colSpan={2}>{item.tempat}</TableCell>
              <TableCell colSpan={2}>{item.nama_perusahaan}</TableCell>
              <TableCell colSpan={2}>{item.created_by_name}</TableCell>
              <TableCell align="center" colSpan={3}>
                <ButtonGroup aria-label="group">
                  <Button
                    onClick={() => this.handleEdit(item.mom_code)}
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
                    onClick={() => this.handleDelete(item.mom_code)}
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
        <TableCell colSpan={14} align="center">
          {" "}
          Data kosong{" "}
        </TableCell>
      </TableRow>
    );
  };

  handleAdd = () => {
    const { history } = this.props;
    history.push("/mom/tambah");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { search, page, rowsPerPage } = this.state;
    const { dataMOM } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard
          loading={false}
          title="Minutes of Meeting"
          subtitle="Data Minutes of Meetings"
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
                    Tambah MOM
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
                    <TableCell colSpan={3}>No MOM</TableCell>
                    <TableCell colSpan={2}>Waktu</TableCell>
                    <TableCell colSpan={2}>Tempat</TableCell>
                    <TableCell colSpan={2}>MOM With</TableCell>
                    <TableCell colSpan={2}>Dibuat Oleh</TableCell>
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
                count={dataMOM?.length ? dataMOM?.length : 0}
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
    dataMOM: state.mom.dataMOM,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMOM: () => dispatch(getMOM()),
    delMOM: (params) => dispatch(delMOM(params)),
    downloadMOM: (params, send_mail, mom_code) =>
      dispatch(downloadMOM(params, send_mail, mom_code)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MOM);
