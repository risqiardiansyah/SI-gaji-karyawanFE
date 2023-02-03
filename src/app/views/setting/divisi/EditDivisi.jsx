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
import { updateDivisi } from "app/redux/actions/WebSettingActions";

class EditDivisi extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      divisi_name: "",
      error: false,
    };
  }

  componentDidMount() {
    const { dataEdit } = this.props;

    this.setState({
      divisi_code: dataEdit.divisi_code,
      divisi_name: dataEdit.divisi_name,
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
    const { divisi_name, type, divisi_code } = this.state;
    const { updateDivisi, handleClose } = this.props;
    const params = {
      divisi_name: divisi_name,
      type: type,
      divisi_code: divisi_code,
    };
    updateDivisi(params)
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
              divisi_name: "",
              divisi_code: "",
              type: "",
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
    let { submit, divisi_name } = this.state;
    let { open, handleClose } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
        <div className="p-5">
          <h4 className="mb-5">Edit Office</h4>
          <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Nama Tunjangan"
                  onChange={this.handleChange}
                  type="text"
                  name="divisi_name"
                  value={divisi_name}
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
                    "Edit"
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
    updateDivisi: (params, id) => dispatch(updateDivisi(params, id)),
  };
};

export default connect(null, mapDispatchToProps)(EditDivisi);
