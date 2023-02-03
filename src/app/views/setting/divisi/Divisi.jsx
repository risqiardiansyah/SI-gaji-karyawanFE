import {
  Button,
  ButtonGroup,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from "@material-ui/core";
import { deleteDivisi, getDivisi } from "app/redux/actions/WebSettingActions";
import { SimpleCard } from "matx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import AddDivisi from "./AddDivisi";
import EditDivisi from "./EditDivisi";

class Divisi extends Component {
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
    const { getDivisi } = this.props;
    getDivisi();
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

  handleDelete = (divisi_code) => {
    const { deleteDivisi, getDivisi } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteDivisi(divisi_code)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getDivisi();
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
    const { dataDivisi } = this.props;
    console.log(dataDivisi);
    return dataDivisi?.length > 0 ? (
      dataDivisi.map((item, index) => (
        <TableRow hover key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.divisi_name}</TableCell>
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
                onClick={() => this.handleDelete(item.divisi_code)}
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
    const { getDivisi } = this.props;
    this.setState({
      openAdd: false,
    });
    getDivisi();
  };

  handleOpenAdd = () => {
    this.setState({
      openAdd: true,
    });
  };

  handleCloseEdit = () => {
    const { getDivisi } = this.props;
    this.setState({
      modalEdit: false,
      modalDetail: false,
    });
    getDivisi();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { openAdd, modalEdit, type, dataEdit } = this.state;

    return (
      <div className="m-sm-30">
        <SimpleCard title="Data Divisi">
          <Fragment>
            <Grid
              container
              spacing={2}
              justify="space-between"
              className="my-4"
            >
              <Grid item lg={12} md={10} sm={12} xs={12} className="mb-4">
                <ButtonGroup aria-label="group">
                  <Button
                    onClick={() => this.handleOpenAdd()}
                    variant="contained"
                    color="primary"
                    className="elevation-z0 font-medium"
                  >
                    Tambah Divisi
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
            <div className="w-full overflow-auto bg-white">
              <Table className="buku-kas-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="pl-2">No</TableCell>
                    <TableCell>Nama Divisi</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTable()}</TableBody>
              </Table>
            </div>
          </Fragment>
        </SimpleCard>
        {openAdd && (
          <AddDivisi
            open={openAdd}
            type={type}
            handleClose={this.handleCloseAdd}
          />
        )}
        {modalEdit && (
          <EditDivisi
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
    dataDivisi: state.setting.dataDivisi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDivisi: () => dispatch(getDivisi()),
    deleteDivisi: (params) => dispatch(deleteDivisi(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Divisi);
