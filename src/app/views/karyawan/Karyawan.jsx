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
  Chip,
} from "@material-ui/core";
import { delKaryawan, getAllKaryawan } from "app/redux/actions/KaryawanActions";
import { getDivisiList } from "app/redux/actions/WebSettingActions";
import { SimpleCard } from "matx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import AddKaryawan from "./AddKaryawan";
import EditKaryawan from "./EditKaryawan";
import DetailKaryawan from "./DetailKaryawan";

class Karyawan extends Component {
  constructor() {
    super();
    this.state = {
      openAdd: false,
      type: "",
      modalEdit: false,
      modalDetail: false,
      dataEdit: {
        id: "",
        kategori: "",
        type: "",
      },
      search: "",
    };
  }

  componentDidMount() {
    const { getAllKaryawan, getDivisiList } = this.props;
    getAllKaryawan();
    getDivisiList();
  }

  handleModalEdit = (data) => {
    this.setState({
      modalEdit: true,
      dataEdit: data,
    });
  };

  handleModalDetail = (data) => {
    this.setState({
      modalDetail: true,
      dataEdit: data,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      modalEdit: false,
      modalDetail: false,
    });
  };

  handleDelete = (karyawan_code) => {
    const { delKaryawan, getAllKaryawan } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        let params = {
          karyawan_code: karyawan_code,
        };
        delKaryawan(params)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getAllKaryawan();
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
    const { dataKaryawan, dataDivisiList } = this.props;
    console.log("DIVI", dataDivisiList);
    return dataKaryawan?.length > 0 ? (
      dataKaryawan
        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(
          (item) =>
            item.nama?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.telp?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.nama}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.telp}</TableCell>
            <TableCell>
              <Chip
                label={item.aktif_bekerja == 0 ? "Tidak" : "Aktif"}
                size="small"
                color={item.aktif_bekerja == 0 ? "error" : "primary"}
              />
            </TableCell>
            <TableCell>
              <Button
                onClick={() => this.handleModalDetail(item)}
                variant="contained"
                className="bg-primary text-white elevation-z0"
              >
                Detail
              </Button>
            </TableCell>
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
                  onClick={() => this.handleDelete(item.karyawan_code)}
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

  handleEditKategori = (data, id) => {
    this.setState({
      modalEdit: true,
      dataEdit: {
        id: data.value,
        kategori: data.label,
        type: id,
      },
    });
  };

  handleCloseAdd = () => {
    const { getAllKaryawan } = this.props;
    this.setState({
      openAdd: false,
    });
    getAllKaryawan();
  };

  handleOpenAdd = (type) => {
    this.setState({
      type: type,
      openAdd: true,
    });
  };

  handleCloseEdit = () => {
    const { getAllKaryawan } = this.props;
    this.setState({
      modalEdit: false,
      modalDetail: false,
    });
    getAllKaryawan();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { openAdd, modalEdit, modalDetail, type, dataEdit, search } =
      this.state;
    const { dataKaryawan } = this.props;

    return (
      <div className="m-sm-30">
        <SimpleCard title="Data Karyawan">
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
                    Tambah Karyawan
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
                    <TableCell>Nama</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>No. Telp</TableCell>
                    <TableCell>Aktif Bekerja ?</TableCell>
                    <TableCell>Detail</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTable()}</TableBody>
              </Table>
            </div>
          </Fragment>
        </SimpleCard>
        {openAdd && (
          <AddKaryawan
            open={openAdd}
            type={type}
            handleClose={this.handleCloseAdd}
            dataKaryawan={dataKaryawan}
          />
        )}
        {modalEdit && (
          <EditKaryawan
            dataEdit={dataEdit}
            open={modalEdit}
            handleClose={this.handleCloseEdit}
            dataKaryawan={dataKaryawan}
          />
        )}
        {modalDetail && (
          <DetailKaryawan
            dataEdit={dataEdit}
            open={modalDetail}
            handleClose={this.handleCloseEdit}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataKaryawan: state.karyawan.allData,
    dataDivisiList: state.setting.dataDivisiList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDivisiList: () => dispatch(getDivisiList()),
    getAllKaryawan: () => dispatch(getAllKaryawan()),
    delKaryawan: (params) => dispatch(delKaryawan(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Karyawan);
