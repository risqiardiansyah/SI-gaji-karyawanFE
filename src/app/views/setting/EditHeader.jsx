import { Button, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { editHeader, getDetailHeader } from "app/redux/actions/SignerActions";
import { ButtonUploadThumbnail } from "app/components";

class EditHeader extends Component {
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
    };
  }

  componentDidMount() {
    const { getDetailHeader } = this.props;
    const { id } = this.props.match.params;
    getDetailHeader(id);
  }

  componentWillReceiveProps(nextProps) {
    let detailKop = nextProps.detailKop;

    if (detailKop) {
      this.setState({
        judul: detailKop.judul,
        header_preview: detailKop.header,
        footer_preview: detailKop.footer,
        header_old: detailKop.header_old,
        footer_old: detailKop.footer_old,
        kop_code: detailKop.kop_code,
      });
    }
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
    const { header, footer, header_old, footer_old, judul, kop_code } =
      this.state;
    const { editHeader } = this.props;
    const params = {
      kop_code: kop_code,
      judul: judul,
      head: header,
      head_old: header_old,
      foot: footer,
      foot_old: footer_old,
    };
    editHeader(params)
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
              <h4 className="mb-5">Edit Header &amp; Footer</h4>
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

const mapStateToProps = (state) => {
  return {
    detailKop: state.signer.detailKop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editHeader: (params) => dispatch(editHeader(params)),
    getDetailHeader: (code) => dispatch(getDetailHeader(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditHeader);
