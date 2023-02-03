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
  InputLabel,
} from "@material-ui/core";
import {
  delKriteriaPenilaian,
  getAllKriteriaPenilaian,
} from "app/redux/actions/PenilaianActions";
import { getDivisiList } from "app/redux/actions/WebSettingActions";
import { SimpleCard } from "matx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import AddKriteria from "./AddKriteria";
import EditKriteria from "./EditKriteria";

class KriteriaPenilaian extends Component {
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
          label: "Mingguan",
          value: "mingguan",
        },
        {
          label: "Bulanan",
          value: "bulanan",
        },
        {
          label: "6 Bulanan",
          value: "6bulanan",
        },
      ],
      type: "mingguan",
      divisi_code: 0,
    };
  }

  componentDidMount() {
    const { type, divisi_code } = this.state;
    const { getAllKriteriaPenilaian, getDivisiList } = this.props;
    getAllKriteriaPenilaian(type, divisi_code);
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

  handleDelete = (pe_code) => {
    const { delKriteriaPenilaian, getAllKriteriaPenilaian } = this.props;
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        delKriteriaPenilaian(pe_code)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
              getAllKriteriaPenilaian(this.state.type, this.state.divisi_code);
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
    const { dataKriteria } = this.props;
    // console.log(dataKriteria);
    return dataKriteria?.length > 0 ? (
      dataKriteria
        .filter((item) => item.type == type)
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {item.type == "mingguan"
                ? item.pe_name_id +
                  " (" +
                  item.group_mingguan.replace("_", " ").toUpperCase() +
                  ")"
                : item.pe_name_id}
            </TableCell>
            <TableCell>{item.pe_bobot} %</TableCell>
            <TableCell>{item.acuan_nilai || "-"}</TableCell>
            <TableCell>{item.divisi_name || "-"}</TableCell>
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
                  onClick={() => this.handleDelete(item.pe_code)}
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
    const { getAllKriteriaPenilaian } = this.props;
    this.setState({
      openAdd: false,
    });
    getAllKriteriaPenilaian(this.state.type, this.state.divisi_code);
  };

  handleOpenAdd = () => {
    this.setState({
      openAdd: true,
    });
  };

  handleCloseEdit = () => {
    const { getAllKriteriaPenilaian } = this.props;
    this.setState({
      modalEdit: false,
      modalDetail: false,
    });
    getAllKriteriaPenilaian(this.state.type, this.state.divisi_code);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeDivisi = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        const { getAllKriteriaPenilaian } = this.props;
        getAllKriteriaPenilaian(this.state.type, this.state.divisi_code);
      }
    );
  };

  render() {
    const { dataDivisiList } = this.props;
    const { openAdd, modalEdit, type, dataEdit, dataType, divisi_code } =
      this.state;

    return (
      <div className="m-sm-30">
        <SimpleCard title="Data Kriteria">
          <Fragment>
            <Grid
              container
              spacing={2}
              justify="space-between"
              className="my-4"
            >
              <Grid item lg={8} md={10} sm={12} xs={12} className="mb-4">
                <ButtonGroup aria-label="group">
                  <Button
                    onClick={() => this.handleOpenAdd()}
                    variant="contained"
                    color="primary"
                    className="elevation-z0 font-medium"
                  >
                    Tambah Kriteria
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <InputLabel id="divisi_code">Divisi</InputLabel>
                <Select
                  value={divisi_code}
                  name="divisi_code"
                  onChange={this.handleChangeDivisi}
                  className="basic-multi-select"
                  placeholder="Divisi"
                  variant="outlined"
                  label="Divisi"
                >
                  <MenuItem value="0" selected>
                    Semua Divisi
                  </MenuItem>
                  {dataDivisiList.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <InputLabel id="tipe_kriteria">Tipe Kriteria</InputLabel>
                <Select
                  value={type}
                  name="type"
                  onChange={this.handleChange}
                  className="basic-multi-select"
                  placeholder="Tipe Kriteria"
                  variant="outlined"
                  label="Tipe Kriteria"
                >
                  {dataType.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <div className="w-full overflow-auto bg-white">
              <Table className="buku-kas-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="pl-2">No</TableCell>
                    <TableCell>Nama Kriteria</TableCell>
                    <TableCell>Bobot</TableCell>
                    <TableCell>Acuan Nilai</TableCell>
                    <TableCell>Divisi</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTable()}</TableBody>
              </Table>
            </div>
          </Fragment>
        </SimpleCard>
        {openAdd && (
          <AddKriteria
            open={openAdd}
            type={type}
            handleClose={this.handleCloseAdd}
          />
        )}
        {modalEdit && (
          <EditKriteria
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
    dataKriteria: state.penilaian.allKriteriaPenilaian,
    dataDivisiList: state.setting.dataDivisiList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDivisiList: () => dispatch(getDivisiList()),
    getAllKriteriaPenilaian: (type, divisi_code) =>
      dispatch(getAllKriteriaPenilaian(type, divisi_code)),
    delKriteriaPenilaian: (params) => dispatch(delKriteriaPenilaian(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(KriteriaPenilaian);
