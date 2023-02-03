import { Card, Grid, IconButton, Icon, Button } from "@material-ui/core";
import {
  getPasalPerjanjian,
  savePasalPerjanjian,
  deletePasalPerjanjian,
} from "app/redux/actions/WebSettingActions";
import { RichTextEditor } from "matx";
import React, { Component } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class SettingPerjanjian extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      pasal_select: "",
      scheduleSelected: [],
      dataEdit: {},
      openAdd: false,
      openEdit: false,
      dataPasal: [],
      content_select: "",
      index: 200,
      display: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    const { dataPasal } = nextProps;

    this.setState({
      dataPasal: dataPasal,
    });
  }

  getData() {
    const { getPasalPerjanjian } = this.props;
    getPasalPerjanjian();
  }

  setDisplay = (index, ke, item) => {
    this.setState({
      pasal_select: ke,
      content_select: item.content,
      judul_select: item.judul,
      index: index,
      display: true,
    });
  };

  handleChange = (contentHtml) => {
    const { dataPasal, index } = this.state;
    dataPasal[index].content = contentHtml;
    this.setState(
      {
        content_select: contentHtml,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleChangeText = (e) => {
    const { dataPasal, index } = this.state;
    dataPasal[index].judul = e.target.value;
    this.setState({
      judul_select: e.target.value,
    });
  };

  handleDialogClose = () => {
    this.setState({
      openAdd: false,
      openEdit: false,
    });
    this.getData();
  };

  handleAdd = () => {
    const { dataPasal } = this.state;
    const newKe = dataPasal.length + 1;
    let data = {
      content: "",
      judul: "",
      ke: newKe,
    };
    let all = dataPasal.concat(data);
    this.setState(
      {
        dataPasal: all,
      },
      () => {
        this.setDisplay(dataPasal.length, newKe, data);
      }
    );
  };

  handleSave = () => {
    const { dataPasal } = this.state;
    const { savePasalPerjanjian } = this.props;
    const params = {
      data: dataPasal,
    };

    savePasalPerjanjian(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            this.getData();
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

  handleDelete = (index, ke) => {
    const { dataPasal } = this.state;
    const { deletePasalPerjanjian } = this.props;
    if (index === undefined) {
      let newData = dataPasal.filter((item) => item.ke != ke);
      const newPasal = [];
      this.setState(
        {
          dataPasal: newData,
          pasal_select: "",
          content_select: "",
          judul_select: "",
        },
        () => {
          this.setState({
            display: false,
            index: 200,
          });
        }
      );
    } else {
      Swal.fire({
        title: "Konfirmasi",
        text: "Apakah kamu yakin ingin menghapus pasal ini?",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        icon: "question",
      }).then((res) => {
        if (res.isConfirmed) {
          deletePasalPerjanjian(index)
            .then((res) => {
              if (res.code === 0) {
                let newData = dataPasal.filter((item) => item.ke != ke);
                this.setState({
                  dataPasal: newData,
                  pasal_select: "",
                  content_select: "",
                  judul_select: "",
                  index: "",
                  display: false,
                });
                Swal.fire({
                  title: "Berhasil",
                  text: "Data berhasil dihapus",
                  timer: 2000,
                  icon: "success",
                });
              }
            })
            .catch((err) => {
              console.log("err", err);
              Swal.fire({
                title: "Gagal",
                text: "Data Ini Belum Tersimpan Di Database !",
                timer: 2000,
                icon: "warning",
              });
            });
        } else {
          Swal.close();
        }
      });
    }
  };

  render() {
    const {
      pasal_select,
      dataPasal = [],
      content_select,
      judul_select,
      display,
      index,
    } = this.state;

    return (
      <div className="m-sm-30">
        <h3>Setting Default Pasal</h3>
        <div className="flex">
          <Grid
            container
            spacing={2}
            className=""
            style={{
              marginRight: "5px",
              minHeight: "100px",
            }}
          >
            <Grid item lg={4} md={4} sm={4} xs={4}>
              {dataPasal.map((item, i) => (
                <>
                  {i == index ? (
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      key={i}
                      className="mb-5"
                    >
                      <Card
                        elevation={2}
                        className={`card-pembayaran flex flex-middle p-4 bg-primary`}
                        onClick={() => this.setDisplay(i, item.ke, item)}
                      >
                        <div className="flex-1 flex flex-middle">
                          <h5
                            className="m-0 ml-4 font-weight-bold text-white"
                            style={{
                              color: "white!important",
                              paddingTop: "17px",
                            }}
                          >
                            {"PASAL " + (i + 1)}
                          </h5>
                        </div>
                        <IconButton style={{ color: "white!important" }}>
                          <Icon style={{ color: "white!important" }}>
                            arrow_forward
                          </Icon>
                        </IconButton>
                        <Button
                          className="container-btn-del-file"
                          onClick={() => this.handleDelete(item.idx, item.ke)}
                        >
                          <Icon className="text-white" fontSize="small">
                            delete
                          </Icon>
                        </Button>
                      </Card>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      key={i}
                      className="mb-5"
                    >
                      <Card
                        elevation={2}
                        className={`card-pembayaran flex flex-middle p-4`}
                        onClick={() => this.setDisplay(i, item.ke, item)}
                      >
                        <div className="flex-1 flex flex-middle">
                          <h5
                            className="m-0 ml-4 font-weight-bold"
                            style={{ paddingTop: "17px" }}
                          >
                            {"PASAL " + (i + 1)}
                          </h5>
                        </div>
                        <IconButton>
                          <Icon>arrow_forward</Icon>
                        </IconButton>
                        <Button
                          className="container-btn-del-file"
                          onClick={() => this.handleDelete(item.idx, item.ke)}
                        >
                          <Icon className="text-white" fontSize="small">
                            delete
                          </Icon>
                        </Button>
                      </Card>
                    </Grid>
                  )}
                </>
              ))}
              <Button
                color="primary"
                variant="contained"
                onClick={() => this.handleAdd()}
                style={{ width: "100%" }}
              >
                <Icon>add</Icon>
                <span className="pl-8 capitalize">Tambah Pasal</span>
              </Button>
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {display === true ? (
                  <Card
                    elevation={2}
                    className="card-pembayaran p-5"
                    style={{ minHeight: "600px" }}
                  >
                    <div
                      className="flex mb-5"
                      style={{ justifyContent: "space-between" }}
                    >
                      <h3 className="font-weight-bold">Isi Pasal</h3>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => this.handleSave()}
                      >
                        Simpan
                      </Button>
                    </div>
                    <ValidatorForm ref="form" onSubmit={this.handleChange}>
                      <TextValidator
                        variant="outlined"
                        className="w-full mb-3"
                        label="Judul"
                        onChange={this.handleChangeText}
                        type="text"
                        name="judul_select"
                        value={judul_select}
                        validators={["required"]}
                        errorMessages={["Field is Required"]}
                        size="small"
                      />
                      <RichTextEditor
                        content={content_select}
                        handleContentChange={this.handleChange}
                        placeholder="Isi pasal..."
                        style={{ maxHeight: 500 }}
                      />
                    </ValidatorForm>
                  </Card>
                ) : (
                  <>
                    <div id="arrowAnim">
                      <div class="arrowSliding">
                        <div class="arrow"></div>
                      </div>
                      <div class="arrowSliding delay1">
                        <div class="arrow"></div>
                      </div>
                      <div class="arrowSliding delay2">
                        <div class="arrow"></div>
                      </div>
                    </div>
                    <h3 className="text-center">Silahkan Pilih Pasal</h3>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataPasal: state.setting.dataPasal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPasalPerjanjian: () => dispatch(getPasalPerjanjian()),
    savePasalPerjanjian: (params) => dispatch(savePasalPerjanjian(params)),
    deletePasalPerjanjian: (idx) => dispatch(deletePasalPerjanjian(idx)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPerjanjian);
