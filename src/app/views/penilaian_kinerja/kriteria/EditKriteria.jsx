import {
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  FormControl,
  FormLabel,
  Grid,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { editKriteriaPenilaian } from "app/redux/actions/PenilaianActions";

class EditKriteria extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      pe_name: "",
      pe_name_id: "",
      pe_name_en: "",
      error: false,
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
      dataKelompok: [
        {
          label: "Sikap",
          value: "sikap",
        },
        {
          label: "Tanggung Jawab",
          value: "tanggung_jawab",
        },
        {
          label: "Kompetensi",
          value: "Kompetensi",
        },
      ],
      type: "mingguan",
      kelompok: "",
      pe_bobot: "",
    };
  }

  componentDidMount() {
    const { dataEdit } = this.props;

    this.setState({
      pe_code: dataEdit.pe_code,
      pe_name_id: dataEdit.pe_name_id,
      pe_name_en: dataEdit.pe_name_en,
      pe_bobot: dataEdit.pe_bobot,
      type: dataEdit.type,
      kelompok: dataEdit.group_mingguan,
      acuan_nilai: dataEdit.acuan_nilai,
      divisi_code: dataEdit.divisi_code,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeType = (event) => {
    this.setState({
      type: event.value,
    });
  };

  handleChangeDivisi = (event) => {
    this.setState({
      divisi_code: event.value,
    });
  };

  handleChangeKelompok = (event) => {
    this.setState({
      kelompok: event.value,
    });
  };

  handleSubmit = () => {
    this.setState(
      {
        submit: true,
      },
      this.sendSubmit
    );
  };

  sendSubmit = () => {
    const {
      pe_code,
      pe_name_id,
      pe_name_en,
      type,
      kelompok,
      pe_bobot,
      acuan_nilai,
      divisi_code,
    } = this.state;
    const { editKriteriaPenilaian, handleClose } = this.props;
    const params = {
      pe_code: pe_code,
      pe_name_id: pe_name_id,
      pe_name_en: pe_name_en,
      type: type,
      group_mingguan: kelompok,
      pe_bobot: pe_bobot,
      acuan_nilai: acuan_nilai,
      divisi_code: divisi_code,
    };
    editKriteriaPenilaian(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            handleClose();
            this.setState({
              submit: false,
              pe_name: "",
            });
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Gagal",
          text: "Data gagal disimpan",
          timer: 2000,
          icon: "error",
        }).then(() =>
          this.setState({
            submit: false,
          })
        );
      });
  };

  render() {
    let {
      submit,
      pe_name_id,
      pe_name_en,
      type,
      dataType,
      kelompok,
      dataKelompok,
      pe_bobot,
      acuan_nilai,
      divisi_code,
    } = this.state;
    let { open, handleClose, dataDivisiList } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
        <div className="p-5">
          <h4 className="mb-5">Edit Kriteria</h4>
          <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <FormControl>
                  <FormLabel style={{ width: "200px" }}>Tipe</FormLabel>
                  <Select
                    value={dataType.filter((item) => item.value == type)}
                    name="type"
                    options={dataType}
                    onChange={this.handleChangeType}
                    className="basic-multi-select"
                    placeholder="Tipe Kriteria"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              {type === "mingguan" && (
                <Grid item sm={6} xs={12}>
                  <FormControl>
                    <FormLabel style={{ width: "200px" }}>Kelompok</FormLabel>
                    <Select
                      value={dataKelompok.filter(
                        (item) => item.value == kelompok
                      )}
                      name="kelompok"
                      options={dataKelompok}
                      onChange={this.handleChangeKelompok}
                      className="basic-multi-select"
                      placeholder="Kelompok"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
              )}
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Nama Kriteria (ID)"
                  onChange={this.handleChange}
                  type="text"
                  name="pe_name_id"
                  value={pe_name_id}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              {type !== "mingguan" && (
                <Grid item sm={12} xs={12}>
                  <TextValidator
                    variant="outlined"
                    className="w-full mb-3"
                    label="Nama Kriteria (EN)"
                    onChange={this.handleChange}
                    type="text"
                    name="pe_name_en"
                    value={pe_name_en}
                    validators={["required"]}
                    errorMessages={["Field is Required"]}
                    size="small"
                  />
                </Grid>
              )}
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Bobot Nilai (%)"
                  onChange={this.handleChange}
                  type="number"
                  name="pe_bobot"
                  value={pe_bobot}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormLabel style={{ width: "100%" }}>Divisi</FormLabel>
                <Select
                  value={dataDivisiList.filter(
                    (item) => item.value == divisi_code
                  )}
                  name="type"
                  options={dataDivisiList}
                  onChange={this.handleChangeDivisi}
                  className="basic-multi-select"
                  placeholder="Divisi"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Acuan Nilai(Minimal)"
                  onChange={this.handleChange}
                  type="text"
                  name="acuan_nilai"
                  value={acuan_nilai}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
            </Grid>

            <div className="w-full text-right">
              <ButtonGroup className="mt-3">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={submit}
                  type="submit"
                >
                  {submit ? (
                    <CircularProgress size={15} color="#fff" />
                  ) : (
                    "Simpan"
                  )}
                </Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="default"
                >
                  Batal
                </Button>
              </ButtonGroup>
            </div>
          </ValidatorForm>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataDivisiList: state.setting.dataDivisiList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editKriteriaPenilaian: (params) => dispatch(editKriteriaPenilaian(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditKriteria);
