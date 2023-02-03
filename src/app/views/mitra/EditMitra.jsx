import {
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  Grid,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { editMitra } from "app/redux/actions/MitraActions";

class EditMitra extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      error: false,
      error_text: "",
      name: "",
      instansi: "",
      mitra_code: "",
    };
  }

  componentDidMount() {
    const { dataEdit } = this.props;

    this.setState({
      name: dataEdit.name,
      instansi: dataEdit.instansi,
      email: dataEdit.email,
      mitra_code: dataEdit.mitra_code,
      jabatan: dataEdit.jabatan,
      alamat: dataEdit.alamat,
      nik: dataEdit.nik,
      npwp: dataEdit.npwp,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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
    const { name, instansi, mitra_code, email, jabatan, alamat, nik, npwp } =
      this.state;
    const { editMitra, handleClose } = this.props;
    const params = {
      name: name,
      instansi: instansi,
      email: email,
      jabatan: jabatan,
      alamat: alamat,
      nik,
      npwp,
    };
    editMitra(params, mitra_code)
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
    let { submit, name, instansi, alamat, email, jabatan, nik, npwp } =
      this.state;
    let { open, handleClose } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
        <div className="p-5">
          <h4 className="mb-5">Edit Pelanggan</h4>
          <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Nama"
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="NIK"
                  onChange={this.handleChange}
                  type="number"
                  name="nik"
                  value={nik}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="NPWP"
                  onChange={this.handleChange}
                  type="number"
                  name="npwp"
                  value={npwp}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Email"
                  onChange={this.handleChange}
                  type="text"
                  name="email"
                  value={email}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Instansi"
                  onChange={this.handleChange}
                  type="text"
                  name="instansi"
                  value={instansi}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Jabatan"
                  onChange={this.handleChange}
                  type="text"
                  name="jabatan"
                  value={jabatan}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Alamat"
                  onChange={this.handleChange}
                  type="text"
                  name="alamat"
                  value={alamat}
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
                    <CircularProgress size={15} color="primary" />
                  ) : (
                    "Update"
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

const mapDispatchToProps = (dispatch) => {
  return {
    editMitra: (params, id) => dispatch(editMitra(params, id)),
  };
};

export default connect(null, mapDispatchToProps)(EditMitra);
