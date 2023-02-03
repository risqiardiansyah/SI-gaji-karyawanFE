import {
  Button,
  ButtonGroup,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  deleteTunjangan,
  getTunjangan,
} from "app/redux/actions/WebSettingActions";
import { SimpleCard } from "matx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import AddTunjangan from "./AddTunjangan";
import EditTunjangan from "./EditTunjangan";

class Tunjangan extends Component {
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
      dataType: [
        {
          label: "Privilege",
          value: 2,
        },
        {
          label: "Benefit Lain",
          value: 3,
        },
      ],
      type: 2,
    };
  }

  componentDidMount() {
    const { getTunjangan } = this.props;
    getTunjangan();
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

  handleDelete = (tj_code) => {
    const { deleteTunjangan, getTunjangan } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteTunjangan(tj_code)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getTunjangan();
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
    const { type } = this.state;
    const { dataTunjangan } = this.props;
    return dataTunjangan?.length > 0 ? (
      dataTunjangan
        .filter((item) => item.type == type)
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.tj_name}</TableCell>
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
                  onClick={() => this.handleDelete(item.tj_code)}
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
    const { getTunjangan } = this.props;
    this.setState({
      openAdd: false,
    });
    getTunjangan();
  };

  handleOpenAdd = () => {
    this.setState({
      openAdd: true,
    });
  };

  handleCloseEdit = () => {
    const { getTunjangan } = this.props;
    this.setState({
      modalEdit: false,
      modalDetail: false,
    });
    getTunjangan();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { openAdd, modalEdit, type, dataEdit, dataType } = this.state;

    return (
      <div className="m-sm-30">
        <SimpleCard title="Data Tunjangan">
          <Fragment>
            <Grid
              container
              spacing={2}
              justify="space-between"
              className="my-4"
            >
              <Grid item lg={10} md={10} sm={12} xs={12} className="mb-4">
                <ButtonGroup aria-label="group">
                  <Button
                    onClick={() => this.handleOpenAdd()}
                    variant="contained"
                    color="primary"
                    className="elevation-z0 font-medium"
                  >
                    Tambah Tunjangan
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <div className="flex items-center">
                  <Select
                    value={type}
                    name="type"
                    onChange={this.handleChange}
                    className="basic-multi-select"
                    placeholder="Tipe Tunjangan"
                    variant="outlined"
                  >
                    {dataType.map((item) => (
                      <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
            </Grid>
            <div className="w-full overflow-auto bg-white">
              <Table className="buku-kas-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="pl-2">No</TableCell>
                    <TableCell>Nama Tunjangan</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTable()}</TableBody>
              </Table>
            </div>
          </Fragment>
        </SimpleCard>
        {openAdd && (
          <AddTunjangan
            open={openAdd}
            type={type}
            handleClose={this.handleCloseAdd}
          />
        )}
        {modalEdit && (
          <EditTunjangan
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
    dataTunjangan: state.setting.dataTunjangan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTunjangan: () => dispatch(getTunjangan()),
    deleteTunjangan: (params) => dispatch(deleteTunjangan(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tunjangan);
