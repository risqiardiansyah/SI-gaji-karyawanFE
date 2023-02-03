import {
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  Grid,
  MenuItem,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { editKaryawan } from "app/redux/actions/KaryawanActions";
import Select from "react-select";
import DateFnsUtils from "@date-io/date-fns";
import { ButtonUploadThumbnail } from "app/components";

class AddKaryawan extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      newKategori: "",
      kategori: [],
      error: false,
      error_text: "",
      type: {
        label: "Karyawan",
        value: 1,
      },
      typeSelected: 1,
      dataType: [
        {
          label: "Karyawan",
          value: 1,
        },
        {
          label: "Magang",
          value: 2,
        },
      ],
      dataAktifBekerja: [
        {
          label: "Aktif",
          value: 1,
        },
        {
          label: "Tidak Aktif",
          value: 0,
        },
      ],
      v_tanggal_lahir: new Date(),
      foto_profile: "",
      foto_ktp: "",
      aktif_bekerja: 0,
      atasan_langsung: "",
      hak_cuti: 0,
      jenis_kelamin: 1,
      divisi_code: "",
    };
  }

  componentDidMount() {
    const { dataEdit } = this.props;
    const { dataType } = this.state;

    let type = dataType[dataEdit.type - 1];

    var event = new Date(dataEdit.tanggal_lahir);
    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);

    this.setState({
      karyawan_code: dataEdit.karyawan_code,
      nama: dataEdit.nama,
      alamat: dataEdit.alamat,
      tempat_lahir: dataEdit.tempat_lahir,
      v_tanggal_lahir: event,
      tanggal_lahir: dateFormat,
      email: dataEdit.email,
      nik: dataEdit.nik,
      type: type,
      telp: dataEdit.telp,
      asal_kampus: dataEdit.asal_kampus,
      status: dataEdit.status,
      typeSelected: dataEdit.type,
      foto_ktp_preview: dataEdit.foto_ktp,
      foto_ktp_old: dataEdit.foto_ktp_old,
      foto_profile_preview: dataEdit.foto_profile,
      foto_profile_old: dataEdit.foto_profile_old,
      foto_bpjs_preview: dataEdit.foto_bpjs,
      foto_bpjs_old: dataEdit.foto_bpjs_old,
      foto_npwp_preview: dataEdit.foto_npwp,
      foto_npwp_old: dataEdit.foto_npwp_old,
      no_bpjs: dataEdit.no_bpjs,
      no_npwp: dataEdit.no_npwp,
      gaji_pokok: dataEdit.gaji_pokok,
      tunjangan: dataEdit.tunjangan,
      posisi: dataEdit.posisi,
      divisi_code: dataEdit.divisi_code,
      aktif_bekerja: dataEdit.aktif_bekerja,
      atasan_langsung: dataEdit.atasan_langsung,
      hak_cuti: dataEdit.hak_cuti,
      jenis_kelamin: dataEdit.jenis_kelamin,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeType = (val) => {
    this.setState({
      type: val.value,
      typeSelected: val.value,
    });
  };

  handleChangeAktifBekerja = (val) => {
    this.setState({
      aktif_bekerja: val.value,
    });
  };

  handleDateChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal_lahir: dateFormat,
      v_tanggal_lahir: event,
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
      nama,
      alamat,
      tempat_lahir,
      tanggal_lahir,
      email,
      nik,
      type,
      telp,
      asal_kampus,
      status,
      typeSelected,
      karyawan_code,
      foto_profile,
      foto_ktp,
      foto_npwp,
      foto_bpjs,
      no_bpjs,
      no_npwp,
      gaji_pokok,
      tunjangan,
      posisi,
      divisi_code,
      foto_ktp_old,
      foto_profile_old,
      aktif_bekerja,
      atasan_langsung,
      hak_cuti,
      jenis_kelamin,
      foto_npwp_old,
      foto_bpjs_old,
    } = this.state;
    const { editKaryawan, handleClose } = this.props;
    const params = new FormData();
    params.append("karyawan_code", karyawan_code);
    params.append("nama", nama);
    params.append("email", email);
    params.append("alamat", alamat);
    params.append("tempat_lahir", tempat_lahir);
    params.append("tanggal_lahir", tanggal_lahir);
    params.append("nik", nik);
    params.append("type", typeSelected);
    params.append("telp", telp);
    params.append("asal_kampus", asal_kampus);
    params.append("foto_ktp", foto_ktp);
    params.append("foto_ktp_old", foto_ktp_old);
    params.append("foto_profile", foto_profile);
    params.append("foto_profile_old", foto_profile_old);
    params.append("foto_npwp_old", foto_npwp_old);
    params.append("foto_bpjs_old", foto_bpjs_old);
    params.append("foto_npwp", foto_npwp);
    params.append("foto_bpjs", foto_bpjs);
    params.append("status", status);
    params.append("no_bpjs", no_bpjs);
    params.append("no_npwp", no_npwp);
    params.append("gaji_pokok", gaji_pokok);
    params.append("tunjangan", tunjangan);
    params.append("posisi", posisi);
    params.append("divisi_code", divisi_code);
    params.append("aktif_bekerja", aktif_bekerja);
    params.append("atasan_langsung", atasan_langsung);
    params.append("hak_cuti", hak_cuti);
    params.append("jenis_kelamin", jenis_kelamin);
    // const params = {
    //   nama: nama,
    //   email: email,
    //   alamat: alamat,
    //   tempat_lahir: tempat_lahir,
    //   tanggal_lahir: tanggal_lahir,
    //   nik: nik,
    //   type: type,
    //   telp: telp,
    //   asal_kampus: asal_kampus,
    //   status: status,
    //   type: typeSelected,
    // };
    editKaryawan(params, karyawan_code)
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
              nama: "",
              email: "",
              alamat: "",
              tempat_lahir: "",
              tanggal_lahir: new Date(),
              nik: "",
              telp: "",
              asal_kampus: "",
              status: "",
              type: 1,
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

  handleUploadProfile = (file, path) => {
    this.setState({
      foto_profile: file.result,
      foto_profile_preview: path,
    });
  };

  handleUploadKTP = (file, path) => {
    this.setState({
      foto_ktp: file.result,
      foto_ktp_preview: path,
    });
  };

  handleUploadNPWP = (file, path) => {
    this.setState({
      foto_npwp: file.result,
      foto_npwp_preview: path,
    });
  };

  handleUploadBPJS = (file, path) => {
    this.setState({
      foto_bpjs: file.result,
      foto_bpjs_preview: path,
    });
  };

  render() {
    let {
      submit,
      nama,
      alamat,
      tempat_lahir,
      v_tanggal_lahir,
      email,
      nik,
      dataType,
      type,
      telp,
      asal_kampus,
      status,
      typeSelected,
      no_bpjs,
      no_npwp,
      gaji_pokok,
      tunjangan,
      foto_profile_preview,
      foto_ktp_preview,
      posisi,
      divisi_code,
      aktif_bekerja,
      dataAktifBekerja,
      atasan_langsung,
      hak_cuti,
      jenis_kelamin,
      foto_npwp_preview,
      foto_bpjs_preview,
    } = this.state;
    let { open, handleClose, dataKaryawan, dataDivisiList } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth={true}>
        <div className="p-5">
          <h4 className="mb-5">Edit Karyawan</h4>
          <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12} className="mb-3">
                <p className="ml-3">Foto Profile</p>
                <div
                  style={{ width: "100%", height: 100 }}
                  className="relative"
                >
                  {foto_profile_preview && (
                    <img
                      src={foto_profile_preview}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <ButtonUploadThumbnail
                    uploadFoto={this.handleUploadProfile}
                  />
                </div>
              </Grid>
              <Grid item sm={6} xs={12} className="mb-3">
                <p className="ml-3">Foto KTP</p>
                <div
                  style={{ width: "100%", height: 100 }}
                  className="relative"
                >
                  {foto_ktp_preview && (
                    <img
                      src={foto_ktp_preview}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <ButtonUploadThumbnail uploadFoto={this.handleUploadKTP} />
                </div>
              </Grid>
              <Grid item sm={6} xs={12} className="mb-3">
                <p className="ml-3">Foto NPWP</p>
                <div
                  style={{ width: "100%", height: 100 }}
                  className="relative"
                >
                  {foto_npwp_preview && (
                    <img
                      src={foto_npwp_preview}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <ButtonUploadThumbnail uploadFoto={this.handleUploadNPWP} />
                </div>
              </Grid>
              <Grid item sm={6} xs={12} className="mb-3">
                <p className="ml-3">Foto BPJS</p>
                <div
                  style={{ width: "100%", height: 100 }}
                  className="relative"
                >
                  {foto_bpjs_preview && (
                    <img
                      src={foto_bpjs_preview}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <ButtonUploadThumbnail uploadFoto={this.handleUploadBPJS} />
                </div>
              </Grid>

              <Grid item sm={12} xs={12}>
                <Select
                  defaultValue={type}
                  name="type"
                  options={dataType}
                  onChange={this.handleChangeType}
                  className="basic-multi-select mb-4"
                  placeholder="Jenis Pekerja"
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Nama"
                  onChange={this.handleChange}
                  type="text"
                  name="nama"
                  value={nama}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>

              <Grid item sm={6} xs={12}>
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
                  label="Alamat Lengkap"
                  onChange={this.handleChange}
                  type="text"
                  name="alamat"
                  value={alamat}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>

              <Grid item sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Tempat Lahir"
                  onChange={this.handleChange}
                  type="text"
                  name="tempat_lahir"
                  value={tempat_lahir}
                  validators={""}
                  errorMessages={""}
                  size="small"
                />
              </Grid>

              <Grid item sm={12} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item sm={12} xs={12}>
                    <KeyboardDatePicker
                      className="w-full"
                      variant="inline"
                      format="dd/MMMM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Tanggal Lahir"
                      value={v_tanggal_lahir}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      size="small"
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Nomor Telepon/Ponsel"
                  onChange={this.handleChange}
                  type="text"
                  name="telp"
                  value={telp}
                  validators={""}
                  errorMessages={""}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="NIK"
                  onChange={this.handleChange}
                  type="number"
                  name="nik"
                  value={nik}
                  validators={""}
                  errorMessages={""}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="No BPJS"
                  onChange={this.handleChange}
                  type="number"
                  name="no_bpjs"
                  value={no_bpjs}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="No NPWP"
                  onChange={this.handleChange}
                  type="number"
                  name="no_npwp"
                  value={no_npwp}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <SelectValidator
                  variant="outlined"
                  className="basic-multi-select mb-4 w-full"
                  label="Jenis Kelamin"
                  onChange={this.handleChange}
                  name="jenis_kelamin"
                  value={jenis_kelamin}
                >
                  <MenuItem value="" disabled>
                    <em>Pilih Atasan Langsung</em>
                  </MenuItem>
                  <MenuItem value="1">Laki-laki</MenuItem>
                  <MenuItem value="0">Perempuan</MenuItem>
                </SelectValidator>
              </Grid>
              <Grid item sm={6} xs={12}>
                <SelectValidator
                  variant="outlined"
                  className="basic-multi-select mb-4 w-full"
                  label="Pilih Atasan Langsung"
                  onChange={this.handleChange}
                  name="atasan_langsung"
                  value={atasan_langsung}
                >
                  <MenuItem value="" disabled>
                    <em>Pilih Atasan Langsung</em>
                  </MenuItem>
                  {dataKaryawan
                    .filter((item) => item.type == 1)
                    .map((item, index) => (
                      <MenuItem value={item.karyawan_code}>
                        {item.nama}
                      </MenuItem>
                    ))}
                </SelectValidator>
              </Grid>
              <Grid item sm={12} xs={12}>
                <SelectValidator
                  variant="outlined"
                  className="basic-multi-select mb-4 w-full"
                  label="Pilih Divisi"
                  onChange={this.handleChange}
                  name="divisi_code"
                  value={divisi_code}
                >
                  <MenuItem value="" disabled>
                    <em>Pilih Divisi</em>
                  </MenuItem>
                  {dataDivisiList.map((item, index) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </SelectValidator>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  value={dataAktifBekerja.filter(
                    (item) => item.value == aktif_bekerja
                  )}
                  name="aktif_bekerja"
                  options={dataAktifBekerja}
                  onChange={this.handleChangeAktifBekerja}
                  className="basic-multi-select mb-4"
                  placeholder="Aktif Bekerja ?"
                />
              </Grid>

              {typeSelected === 1 ? (
                <>
                  <Grid item sm={6} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label="Gaji Pokok"
                      onChange={this.handleChange}
                      type="number"
                      name="gaji_pokok"
                      value={gaji_pokok}
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label="Tunjangan"
                      onChange={this.handleChange}
                      type="number"
                      name="tunjangan"
                      value={tunjangan}
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label="Posisi"
                      onChange={this.handleChange}
                      type="text"
                      name="posisi"
                      value={posisi}
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label="Status"
                      onChange={this.handleChange}
                      type="text"
                      name="status"
                      value={status}
                      validators={""}
                      errorMessages={""}
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label="Hak Cuti Tahunan"
                      onChange={this.handleChange}
                      type="number"
                      name="hak_cuti"
                      value={hak_cuti}
                      size="small"
                    />
                  </Grid>
                </>
              ) : (
                ""
              )}

              {typeSelected === 2 ? (
                <>
                  <Grid item sm={6} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label="Posisi"
                      onChange={this.handleChange}
                      type="text"
                      name="posisi"
                      value={posisi}
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label="Asal Kampus"
                      onChange={this.handleChange}
                      type="text"
                      name="asal_kampus"
                      value={asal_kampus}
                      validators={""}
                      errorMessages={""}
                      size="small"
                    />
                  </Grid>
                </>
              ) : (
                ""
              )}
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

const mapStateToProps = (state) => {
  return {
    dataDivisiList: state.setting.dataDivisiList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editKaryawan: (params, id) => dispatch(editKaryawan(params, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddKaryawan);
