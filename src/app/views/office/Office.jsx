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
import { deleteOffice, getOffice } from "app/redux/actions/WebSettingActions";
import { SimpleCard } from "matx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import AddKaryawan from "./AddOffice";
import EditKaryawan from "./EditOffice";

class Office extends Component {
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
    const { getOffice } = this.props;
    getOffice();
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
    const { deleteOffice, getOffice } = this.props;
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
        deleteOffice(params)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getOffice();
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
    const { search } = this.state;
    const { dataOffice } = this.props;
    return dataOffice?.length > 0 ? (
      dataOffice
        .filter((item) =>
          item.office_name?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.office_name}</TableCell>
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
                  onClick={() => this.handleDelete(item.idx)}
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
        <TableCell colSpan={3} align="center">
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
    const { getOffice } = this.props;
    this.setState({
      openAdd: false,
    });
    getOffice();
  };

  handleOpenAdd = (type) => {
    this.setState({
      type: type,
      openAdd: true,
    });
  };

  handleCloseEdit = () => {
    const { getOffice } = this.props;
    this.setState({
      modalEdit: false,
      modalDetail: false,
    });
    getOffice();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { openAdd, modalEdit, modalDetail, type, dataEdit, search } =
      this.state;

    return (
      <div className="m-sm-30">
        <SimpleCard title="Data Office">
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
                    Tambah Office
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
                    <TableCell>Nama Office</TableCell>
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
          />
        )}
        {modalEdit && (
          <EditKaryawan
            dataEdit={dataEdit}
            open={modalEdit}
            handleClose={this.handleCloseEdit}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataOffice: state.setting.dataOffice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOffice: () => dispatch(getOffice()),
    deleteOffice: (params) => dispatch(deleteOffice(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Office);
