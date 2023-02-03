import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Icon,
} from "@material-ui/core";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Select from "react-select";
import RichTextEditor from "matx/components/RichTextEditor";
import { Fragment } from "react";
import { getKaryawan } from "app/redux/actions/KaryawanActions";
import { getSigner } from "app/redux/actions/SignerActions";
import {
  editPerjanjianKontrak,
  getDetailPerjanjianKontrak,
} from "app/redux/actions/PerjanjianAction";
import { getAllHeader } from "app/redux/actions/SignerActions";

class EditPerjanjian extends Component {
  constructor() {
    super();
    this.state = {
      nama_karyawan: "",
      nama_signer: "",
      nama_proyek: "",
      judulContent: "",
      index: 0,
      notesPasal: [
        {
          ke: 0,
          content: "",
          judul: "",
        },
      ],
      dataPasal: [],
      submit: false,
    };
  }

  componentDidMount() {
    const {
      getDetailPerjanjianKontrak,
      getSigner,
      getKaryawan,
      dataSigner,
      dataKaryawan,
      getAllHeader,
    } = this.props;
    const { match } = this.props;

    getSigner();
    getKaryawan();
    getDetailPerjanjianKontrak(match.params.id);
    getAllHeader("list");

    this.setState({
      optionDataSigner: dataSigner,
      optionDataKaryawan: dataKaryawan,
    });
  }

  submitForm = () => this.setState({ submit: true }, () => this.sendSubmit());

  sendSubmit() {
    const { nama_karyawan, nama_signer, notesPasal, kop_code } = this.state;
    const { match } = this.props;

    const params = {
      karyawan_code: nama_karyawan,
      signer_code: nama_signer,
      pasal: notesPasal,
      unique_code: match.params.id,
      kop_code: kop_code,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { editPerjanjianKontrak, history } = this.props;
    editPerjanjianKontrak(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil di perbaharui",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/perjanjian_kerja");
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Gagal",
          text: "Data gagal di perbaharui",
          timer: 2000,
          icon: "error",
        }).then(() =>
          this.setState({
            submit: false,
          })
        );
      });
  }

  handleChange = (e) => {
    let itemIndex = e.target.id;
    const { notesPasal } = this.state;
    let newNotesPasal = notesPasal;
    newNotesPasal[itemIndex][e.target.name] = e.target.value;

    this.setState({
      notesPasal: newNotesPasal,
    });
  };

  handleChangeKaryawan = (val) =>
    this.setState({ ...this.state, nama_signer: val.value });

  handleChangePelanggan = (val) =>
    this.setState({ ...this.state, nama_karyawan: val.value });

  handleChangeRich = (index, content) => {
    const { notesPasal } = this.state;
    let newNotesPasal = notesPasal;
    newNotesPasal[index]["content"] = content;

    this.setState({
      notesPasal: newNotesPasal,
    });
  };

  addItem = () => {
    let { notesPasal } = this.state;
    let data = [
      {
        index: notesPasal.length + 1,
        judul: "",
        content: "",
      },
    ];

    let all = notesPasal.concat(data);

    this.setState({
      notesPasal: all,
      judulContent: "",
    });
  };

  deleteItem = (ke) => {
    let { notesPasal } = this.state;
    let newData = notesPasal.filter((item) => item.ke !== ke);

    this.setState({
      notesPasal: newData,
      judulContent: "",
    });
  };

  handleLanguage = (val) => {
    this.setState({
      bahasa: val.value,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { detailPerjanjian } = nextProps;
    this.setState({
      notesPasal: detailPerjanjian?.pasal,
      nama_karyawan: detailPerjanjian?.karyawan_code,
      nama_signer: detailPerjanjian?.signer_code,
      kop_code: detailPerjanjian?.kop_code,
    });
  }

  handleChangeKop = (val) => {
    this.setState({
      kop_code: val.value,
    });
  };

  render() {
    const {
      nama_karyawan,
      nama_signer,
      notesPasal = [],
      submit,
      kop_code,
    } = this.state;
    const { dataKaryawan, dataSigner, dataKop } = this.props;

    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Edit Perjanjian Kerja">
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Select
                  value={dataKop?.filter((item) => item.value == kop_code)}
                  name="kop_code"
                  options={dataKop}
                  onChange={this.handleChangeKop}
                  className="basic-multi-select mb-4"
                  placeholder="Kop Surat"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  value={dataKaryawan?.filter(
                    (item) => item.value === nama_karyawan
                  )}
                  name="nama_karyawan"
                  options={dataKaryawan}
                  onChange={this.handleChangePelanggan}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Karyawan *"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  value={dataSigner?.filter(
                    (item) => item.value === nama_signer
                  )}
                  name="nama_signer"
                  options={dataSigner}
                  onChange={this.handleChangeKaryawan}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Signer *"
                />
              </Grid>
            </Grid>
            {notesPasal.map((item, index) => (
              <Fragment key={index + 1}>
                <b>
                  <p>Pasal {index + 1}</p>
                </b>

                <Grid container spacing={2}>
                  <Grid item sm={11} xs={11}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label="Judul *"
                      type="text"
                      validators={["required"]}
                      errorMessages={["Field is Required"]}
                      size="small"
                      name="judul"
                      value={item.judul}
                      onChange={this.handleChange}
                      id={index}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={11} sm={11} md={11} lg={11}>
                    <RichTextEditor
                      content={item.content}
                      placeholder="Isikan Pasal..."
                      handleContentChange={(content) =>
                        this.handleChangeRich(index, content)
                      }
                      id={index}
                    />
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} className="m-auto">
                    <Button
                      variant="contained"
                      className={
                        "elevation-z0" + notesPasal.length == 1
                          ? ""
                          : "bg-error"
                      }
                      onClick={() => this.deleteItem(item.ke)}
                      disabled={notesPasal.length == 1 ? true : false}
                      style={{
                        display: "flex !important",
                        justifyContent: "center !important",
                        alignItems: "center !important",
                        textAlign: "center !important",
                        marginLeft: "-8px",
                      }}
                    >
                      Hapus
                    </Button>
                  </Grid>
                </Grid>
              </Fragment>
            ))}
            <Button
              variant="contained"
              className="bg-secondary text-white elevation-z0 mb-4 mt-3"
              onClick={() => this.addItem()}
            >
              <Icon>add</Icon>
              <span className="pl-2 capitalize">Tambah Pasal</span>
            </Button>
            <br />
            <br />
            <br />

            <div className="w-full text-right">
              <ButtonGroup className="mt-3">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submit}
                >
                  {submit ? (
                    <CircularProgress size={15} color="#fff" />
                  ) : (
                    "Simpan "
                  )}
                </Button>
              </ButtonGroup>
            </div>
          </ValidatorForm>
        </SimpleCard>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataKaryawan: state.karyawan.data,
    dataSigner: state.signer.data,
    detailPerjanjian: state.perjanjian.detail,
    dataKop: state.signer.dataKop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getKaryawan: () => dispatch(getKaryawan()),
    getSigner: () => dispatch(getSigner()),
    editPerjanjianKontrak: (params) => dispatch(editPerjanjianKontrak(params)),
    getDetailPerjanjianKontrak: (params) =>
      dispatch(getDetailPerjanjianKontrak(params)),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPerjanjian);
