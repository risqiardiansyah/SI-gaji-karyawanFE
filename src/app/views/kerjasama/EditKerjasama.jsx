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
import { getPelanggan } from "app/redux/actions/PelangganActions";
import { getSigner } from "app/redux/actions/SignerActions";
import {
  editKerjasama,
  getDetailKerjasama,
} from "app/redux/actions/KerjasamaAction";
import { getAllHeader } from "app/redux/actions/SignerActions";

class EditKerjasama extends Component {
  constructor() {
    super();
    this.state = {
      nama_mitra: "",
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

      dataLanguage: [
        {
          label: "Indonesia",
          value: "ind",
        },
        {
          label: "English",
          value: "eng",
        },
      ],
      bahasa: "",

      dataPasal: [],
      submit: false,
    };
  }
  setPage = (page) => {
    this.setState({ page });
  };
  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  componentDidMount() {
    const {
      getPelanggan,
      getDetailKerjasama,
      getSigner,
      dataPelanggan,
      dataSigner,
      getAllHeader,
    } = this.props;

    const { match } = this.props;

    getPelanggan();
    getSigner();
    getDetailKerjasama(match.params.id);
    getAllHeader("list");

    this.setState({
      optionDataPelanggan: dataPelanggan,
      optionDataSigner: dataSigner,
    });
  }

  submitForm = () => this.setState({ submit: true }, () => this.sendSubmit());

  sendSubmit() {
    const {
      nama_mitra,
      nama_signer,
      nama_proyek,
      notesPasal,
      bahasa,
      kop_code,
    } = this.state;
    const { match } = this.props;

    const params = {
      mitra_code: nama_mitra,
      signer_code: nama_signer,
      nama_proyek: nama_proyek,
      pasal: notesPasal,
      perjanjian_code: match.params.id,
      bahasa: bahasa,
      kop_code: kop_code,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { editKerjasama, history } = this.props;
    editKerjasama(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil di perbaharui",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/kerjasama");
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

  handleProyek = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

  handleChangeItem = (e) => {
    let { total, jml_term } = this.state;
    let newTotal = total;
    newTotal = e.target.value;
    this.setState({
      total: newTotal,
    });
    this.handleChangeTerm(jml_term);
  };

  handleChangeChecked = (e) => {
    e.persist();
    const { ppnChecked } = this.state;
    this.setState({ [e.target.name]: !ppnChecked }, () =>
      this.handleCountTotal()
    );
  };

  handleCountTotal = () => {
    const { total, ppn, ppnChecked } = this.state;
    let countPPN = total * 0.1;
    const countTotal = total + countPPN;
    this.setState({
      allTotal: total,
      ppn: 0,
    });

    if (ppnChecked) {
      this.setState({
        ppn: countPPN,
        allTotal: countTotal,
      });
    }
  };

  handleChangePelanggan = (val) =>
    this.setState({ ...this.state, nama_mitra: val.value });

  handleChangeSigner = (val) => this.setState({ nama_signer: val.value });

  handleChangeJudul = (val) => this.setState({ judul: val.value });

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
    const { detailKerjasama } = nextProps;
    this.setState({
      notesPasal: detailKerjasama?.pasal,
      nama_mitra: detailKerjasama?.mitra_code,
      nama_proyek: detailKerjasama?.nama_proyek,
      nama_signer: detailKerjasama?.signer_code,
      bahasa: detailKerjasama?.bahasa,
      kop_code: detailKerjasama?.kop_code,
    });
  }

  handleChangeKop = (val) => {
    this.setState({
      kop_code: val.value,
    });
  };

  render() {
    const {
      nama_mitra,
      nama_signer,
      nama_proyek,
      judulContent,
      notesPasal = [],
      submit,
      bahasa,
      dataLanguage,
      kop_code,
    } = this.state;
    const { dataPelanggan, dataSigner, dataKop } = this.props;

    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Edit Kerjasama">
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
                  value={dataPelanggan?.filter(
                    (item) => item.value === nama_mitra
                  )}
                  name="nama_mitra"
                  options={dataPelanggan}
                  onChange={this.handleChangePelanggan}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Mitra *"
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
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Nama Proyek *"
                  type="text"
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                  name="nama_proyek"
                  value={nama_proyek}
                  onChange={this.handleProyek}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={dataLanguage.filter(
                    (item) => item.value === bahasa
                  )}
                  name="bahasa"
                  options={dataLanguage}
                  onChange={this.handleLanguage}
                  className="basic-multi-select mb-4"
                  placeholder="Bahasa"
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
    dataPelanggan: state.pelanggan.data,
    dataSigner: state.signer.data,
    detailKerjasama: state.kerjasama.detail,
    dataKop: state.signer.dataKop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPelanggan: () => dispatch(getPelanggan()),
    getSigner: () => dispatch(getSigner()),
    editKerjasama: (params) => dispatch(editKerjasama(params)),
    editKerjasama: (params) => dispatch(editKerjasama(params)),
    getDetailKerjasama: (params) => dispatch(getDetailKerjasama(params)),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditKerjasama);
