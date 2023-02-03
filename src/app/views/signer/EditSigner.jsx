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
import { editSigner } from "app/redux/actions/SignerActions";

class EditSigner extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      error: false,
      error_text: "",
      name: "",
      instansi: "",
      address: "",
      position: "",
      signer_code: "",
      nik: "",
      npwp: "",
    };
  }

  componentDidMount() {
    const { dataEdit } = this.props;

    this.setState({
      name: dataEdit.name,
      nik: dataEdit.nik,
      npwp: dataEdit.npwp,
      instansi: dataEdit.instansi,
      position: dataEdit.position,
      address: dataEdit.address,
      signer_code: dataEdit.signer_code,
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
    const { name, instansi, address, signer_code, position, nik, npwp } =
      this.state;
    const { editSigner, handleClose } = this.props;
    const params = {
      name: name,
      instansi: instansi,
      address: address,
      position: position,
      nik: nik,
      npwp: npwp,
    };
    editSigner(params, signer_code)
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
              name: "",
              deskripsi: "",
              mata_uang: "",
              saldo: 0,
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
    let { submit, name, instansi, address, position, nik, npwp } = this.state;
    let { open, handleClose } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
        <div className="p-5">
          <h4 className="mb-5">Edit Signer</h4>
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
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Alamat"
                  onChange={this.handleChange}
                  type="text"
                  name="address"
                  value={address}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Posisi"
                  onChange={this.handleChange}
                  type="text"
                  name="position"
                  value={position}
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
    editSigner: (params, id) => dispatch(editSigner(params, id)),
  };
};

export default connect(null, mapDispatchToProps)(EditSigner);
