import {
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { tambahTunjangan } from "app/redux/actions/WebSettingActions";

class AddTunjangan extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      tj_name: "",
      error: false,
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
    const { tj_name, type } = this.state;
    const { tambahTunjangan, handleClose } = this.props;
    const params = {
      tj_name: tj_name,
      type: type,
    };
    tambahTunjangan(params)
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
              tj_name: "",
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
    let { submit, tj_name, type, dataType } = this.state;
    let { open, handleClose } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
        <div className="p-5">
          <h4 className="mb-5">Tambah Tunjangan</h4>
          <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Nama Tunjangan"
                  onChange={this.handleChange}
                  type="text"
                  name="tj_name"
                  value={tj_name}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    tambahTunjangan: (params) => dispatch(tambahTunjangan(params)),
  };
};

export default connect(null, mapDispatchToProps)(AddTunjangan);
