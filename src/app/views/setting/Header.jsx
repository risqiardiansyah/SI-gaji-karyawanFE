import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  InputAdornment,
  Table,
  TableCell,
  TableRow,
  TextField,
  TableBody,
  TableHead,
} from "@material-ui/core";
import { delHeader, getAllHeader } from "app/redux/actions/SignerActions";
import { formatTanggal } from "app/utils/globalFunction";
import { SimpleCard } from "matx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      openAdd: false,
      type: "",
      modalEdit: false,
      dataEdit: {
        id: "",
        kategori: "",
        type: "",
      },
      search: "",
    };
  }

  componentDidMount() {
    const { getAllHeader } = this.props;
    getAllHeader();
  }

  handleModalEdit = (data) => {
    window.location.href = `/header/edit/${data.kop_code}`;
  };

  handleDelete = (id) => {
    const { delHeader, getAllHeader } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        delHeader(id)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getAllHeader();
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
    const { search, page, rowsPerPage } = this.state;
    const { dataKop } = this.props;
    return dataKop?.length > 0 ? (
      dataKop
        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter((item) =>
          item.judul?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.judul}</TableCell>
            <TableCell>{formatTanggal(item.created_at)}</TableCell>
            <TableCell align="center">
              <ButtonGroup aria-label="group">
                <Button
                  onClick={() => this.handleModalEdit(item)}
                  variant="contained"
                  className="bg-primary text-white elevation-z0"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => this.handleDelete(item.kop_code)}
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
        <TableCell colSpan={4} align="center">
          {" "}
          Data kosong{" "}
        </TableCell>
      </TableRow>
    );
  };

  handleOpenAdd = () => {
    window.location.href = `/header/add`;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { search } = this.state;
    return (
      <div className="m-sm-30">
        <SimpleCard title="Data Kop Surat">
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
                    onClick={() => this.handleOpenAdd()}
                    variant="contained"
                    color="primary"
                    className="elevation-z0 font-medium"
                  >
                    Tambah
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
                    <TableCell>Judul</TableCell>
                    <TableCell>Tanggal Dibuat</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTable()}</TableBody>
              </Table>
            </div>
          </Fragment>
        </SimpleCard>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataKop: state.signer.dataKop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllHeader: () => dispatch(getAllHeader()),
    delHeader: (params) => dispatch(delHeader(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
