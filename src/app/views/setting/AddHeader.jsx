import { Button, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { addHeader } from "app/redux/actions/SignerActions";
import { ButtonUploadThumbnail } from "app/components";

class AddHeader extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      error: false,
      error_text: "",
      buku_kas: [],
      optionBukuKas: [],
      name: "",
      instansi: "",
      address: "",
      position: "",
      header_preview: "",
      footer_preview: "",
      judul: "",
    };
  }

  componentDidMount() {}

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
    const { header, footer, judul } = this.state;
    const { addHeader } = this.props;
    const params = {
      head: header,
      foot: footer,
      judul: judul,
    };
    addHeader(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            window.location.href = "/setting";
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

  handleUploadHeader = (file, path) => {
    this.setState({
      header: file.result,
      headerFile: path,
      header_preview: path,
    });
  };

  handleUploadFooter = (file, path) => {
    this.setState({
      footer: file.result,
      footerFile: path,
      footer_preview: path,
    });
  };

  render() {
    let {
      submit,
      header_preview,
      headerFile,
      footer_preview,
      footerFile,
      judul,
    } = this.state;
    return (
      <div className="p-5">
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
              <h4 className="mb-5">Tambah Header &amp; Footer</h4>
              <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                  <TextValidator
                    variant="outlined"
                    className="w-full"
                    label="Judul *"
                    onChange={this.handleChange}
                    type="text"
                    name="judul"
                    value={judul}
                    validators={["required"]}
                    errorMessages={["Field is Required"]}
                    size="small"
                  />
                </Grid>
                <Grid item sm={12} xs={12} className="pb-0">
                  <p className="ml-3">Header</p>
                  <div
                    style={{ width: "100%", height: 100 }}
                    className="relative"
                  >
                    {headerFile && (
                      <img
                        src={headerFile}
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                    <ButtonUploadThumbnail
                      uploadFoto={this.handleUploadHeader}
                    />
                  </div>
                </Grid>
                <Grid item sm={12} xs={12} className="pb-0">
                  <p className="ml-3">Footer</p>
                  <div
                    style={{ width: "100%", height: 100 }}
                    className="relative"
                  >
                    {footerFile && (
                      <img
                        src={footerFile}
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                    <ButtonUploadThumbnail
                      uploadFoto={this.handleUploadFooter}
                    />
                  </div>
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
                </ButtonGroup>
              </div>
            </ValidatorForm>
          </Grid>
          <Grid item sm={6} xs={6}>
            <h4 className="mb-5">Preview</h4>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <img src={header_preview} alt="" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <img
                  src="https://api.finance.alan.co.id/storage/kop/Kop-main.png"
                  alt=""
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <img src={footer_preview} alt="" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addHeader: (params) => dispatch(addHeader(params)),
  };
};

export default connect(null, mapDispatchToProps)(AddHeader);
