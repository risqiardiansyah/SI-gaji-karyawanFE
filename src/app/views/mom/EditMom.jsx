import {
  Button,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  FormControlLabel,
  Checkbox,
  Icon,
  TextareaAutosize,
} from "@material-ui/core";
import { getSigner } from "app/redux/actions/SignerActions";
// import { getKaryawan } from "app/redux/actions/KaryawanActions";
import {
  getMOMWith,
  editMOM,
  getDetailMOM,
} from "app/redux/actions/MOMActions";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Select from "react-select";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from "react-router-dom";
import moment from "moment";

class EditMOM extends Component {
  constructor() {
    super();
    this.state = {
      tgl: new Date().toISOString().split("T")[0],
      jam_mulai: new Date().toISOString(),
      jam_selesai: new Date().toISOString(),
      submit: 0,
      type: "",
      tempat: "",
      agenda: "",
      optionChecked: [],
      optionCheckedNested: [],
      optionDetail: [
        {
          label: "Table",
          value: "table",
        },
        {
          label: "Text",
          value: "text",
        },
      ],
      optionStatus: [
        {
          label: "Open",
          value: 1,
        },
        {
          label: "Closed",
          value: 0,
        },
      ],
      catatan: "",
      pembahasanTable: [
        {
          index: 0,
          pembahasan: "",
          tindak_lanjut: "",
          pic: "",
          target: "",
          status: 0,
        },
      ],
      pembahasan: "",
      nama_perusahaan: "",
      setted: false,
      nama_signer: "",
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
    const { getMOMWith, getDetailMOM, getSigner } = this.props;
    getMOMWith();
    getSigner();
    getDetailMOM(this.props.match.params.mom_code);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    const { detailMOM } = nextProps;
    let { setted } = this.state;
    if (Object.keys(detailMOM).length > 0 && !setted) {
      this.setState({
        tgl: detailMOM.tgl,
        jam_mulai: detailMOM.tgl + " " + detailMOM.jam_mulai,
        jam_selesai: detailMOM.tgl + " " + detailMOM.jam_selesai,
        tempat: detailMOM.tempat,
        agenda: detailMOM.agenda,
        nama_perusahaan: detailMOM.nama_perusahaan,
        type: detailMOM.type_discussion,
        pembahasan: detailMOM.pembahasan,
        pembahasanTable: detailMOM.mom_table
          ? detailMOM.mom_table
          : this.state.pembahasanTable,
        optionChecked: detailMOM.mom_with,
        optionCheckedNested: detailMOM.mom_with_nested,
        catatan: detailMOM.catatan,
        nama_signer: detailMOM.signer_code,
        setted: true,
      });
    }
  }

  submitForm = () => {
    this.setState(
      {
        submit: true,
      },
      () => {
        this.sendSubmit();
      }
    );
  };

  sendSubmit() {
    const {
      tgl,
      jam_mulai,
      jam_selesai,
      tempat,
      agenda,
      nama_perusahaan,
      type,
      pembahasan,
      pembahasanTable,
      optionCheckedNested,
      optionChecked,
      catatan,
      nama_signer,
    } = this.state;
    const { match } = this.props;

    let is_other_company =
      optionChecked.filter((item) => item.mw_code === "pr_lain").length > 0
        ? 1
        : 0;

    for (let i = 0; i < optionChecked.length; i++) {
      if (optionChecked[i].mw_nested) {
        let mwn = optionCheckedNested.filter(
          (item) => item.mw_code === optionChecked[i].mw_code
        );
        var mwn_code = mwn.map(function (item) {
          return item.mwn_code;
        });

        optionChecked[i].mwn_code = mwn_code.join(", ");
      }
    }

    let params = {
      mom_code: match.params.mom_code,
      tgl: tgl,
      jam_mulai: jam_mulai,
      jam_selesai: jam_selesai,
      tempat: tempat,
      agenda: agenda,
      is_other_company: is_other_company,
      nama_perusahaan: nama_perusahaan,
      type_discussion: type,
      pembahasan: pembahasan,
      catatan: catatan,
      mom_table: pembahasanTable,
      mom_with: optionChecked,
      signer_code: nama_signer,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { editMOM, history } = this.props;
    editMOM(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/mom");
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
  }

  handleChangeType = (val) => {
    this.setState({
      type: val.value,
    });
  };

  handleTanggal = (date) => {
    const event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tgl: dateFormat,
    });
  };

  handleJamMulai = (time) => {
    const event = moment(time).format("YYYY-MM-DD H:mm:ss");
    console.log(event);
    this.setState({
      jam_mulai: event,
    });
  };

  handleJamSelesai = (time) => {
    const event = moment(time).format("YYYY-MM-DD H:mm:ss");
    console.log(event);
    this.setState({
      jam_selesai: event,
    });
  };

  handleChange = (event) => {
    console.log(event);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeItem = (e) => {
    let idx = e.target.id;
    let { pembahasanTable } = this.state;
    let newPembahasanTable = pembahasanTable;

    newPembahasanTable[idx][e.target.name] = e.target.value;

    this.setState({
      pembahasanTable: newPembahasanTable,
    });
  };

  handleChangeItemSelect = (val, index) => {
    let { pembahasanTable } = this.state;
    let newPembahasanTable = pembahasanTable;

    newPembahasanTable[index]["status"] = val.value;

    this.setState({
      pembahasanTable: newPembahasanTable,
    });
  };

  handleChecked = (event, data) => {
    let { optionChecked, nama_perusahaan, optionCheckedNested } = this.state;
    let newOptionChecked = optionChecked;
    let item = {
      mw_code: data.mw_code,
      mw_nested: data.is_nested,
    };

    if (data.mw_code == "internal") {
      newOptionChecked = newOptionChecked.filter(
        (item) => item.mw_code != "pr_lain"
      );
      nama_perusahaan = "";
    }
    if (data.mw_code == "pr_lain") {
      newOptionChecked = newOptionChecked.filter(
        (item) => item.mw_code != "internal"
      );
      optionCheckedNested = [];
    }

    if (event.target.checked) {
      newOptionChecked.push(item);
    } else {
      newOptionChecked = newOptionChecked.filter(
        (item) => item.mw_code != data.mw_code
      );
    }

    this.setState({
      optionChecked: newOptionChecked,
      optionCheckedNested: optionCheckedNested,
      nama_perusahaan: nama_perusahaan,
    });
  };

  handleCheckedNested = (event, data) => {
    let { optionCheckedNested } = this.state;
    let newOptionCheckedNested = optionCheckedNested;
    let item = {
      mw_code: data.mw_code,
      mwn_code: data.mwn_code,
    };
    if (event.target.checked) {
      newOptionCheckedNested.push(item);
    } else {
      newOptionCheckedNested = newOptionCheckedNested.filter(
        (item) => item.mwn_code != data.mwn_code
      );
    }

    console.log(newOptionCheckedNested);

    this.setState({
      optionCheckedNested: newOptionCheckedNested,
    });
  };

  addItemPembahasan = () => {
    let { pembahasanTable } = this.state;
    let data = [
      {
        index: pembahasanTable.length + 1,
        pembahasan: "",
        tindak_lanjut: "",
        pic: "",
        target: "",
        status: 0,
      },
    ];

    let all = pembahasanTable.concat(data);
    for (let i = 0; i < all.length; i++) {
      all[i].index = i;
    }

    this.setState({
      pembahasanTable: all,
    });
  };

  deleteItem = (index) => {
    let { pembahasanTable } = this.state;
    let newData = pembahasanTable.filter((item) => item.index != index);

    this.setState({
      pembahasanTable: newData,
    });
  };

  handleChangeSigner = (val) => this.setState({ nama_signer: val.value });

  render() {
    const {
      submit,
      tgl,
      type,
      jam_mulai,
      jam_selesai,
      tempat,
      agenda,
      optionChecked,
      optionCheckedNested,
      nama_perusahaan,
      optionDetail,
      catatan,
      pembahasanTable,
      optionStatus,
      pembahasan,
      nama_signer,
    } = this.state;
    const { MOMWith, dataSigner } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Edit data Minutes of Meeting(MoM)">
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Tempat *"
                  type="text"
                  name="tempat"
                  value={tempat}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Agenda *"
                  type="text"
                  name="agenda"
                  value={agenda}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <div className="ml-1">
                  <h5>Meeting Person</h5>
                  {MOMWith.map((data, index) => (
                    <>
                      <FormControlLabel
                        label={data.mw_name}
                        control={
                          <Checkbox
                            checked={
                              optionChecked.filter(
                                (item) => item.mw_code == data.mw_code
                              ).length > 0
                            }
                            onChange={(event) =>
                              this.handleChecked(event, data)
                            }
                          />
                        }
                      />
                      <br />
                      {data.is_nested == 1 &&
                        optionChecked.filter(
                          (itm) => itm.mw_code == data.mw_code
                        ).length > 0 &&
                        data.mwn_data.map((item, index) => (
                          <>
                            <FormControlLabel
                              label={item.mwn_name}
                              control={
                                <Checkbox
                                  checked={
                                    optionCheckedNested.filter(
                                      (it) => it.mwn_code == item.mwn_code
                                    ).length > 0
                                  }
                                  onChange={(event) =>
                                    this.handleCheckedNested(event, item)
                                  }
                                />
                              }
                              style={{ marginLeft: "15px" }}
                            />
                          </>
                        ))}
                    </>
                  ))}
                  {optionChecked.filter((itm) => itm.mw_code == "pr_lain")
                    .length > 0 && (
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label="Nama Perusahaan *"
                      type="text"
                      name="nama_perusahaan"
                      value={nama_perusahaan}
                      validators={["required"]}
                      errorMessages={["Field is Required"]}
                      size="small"
                      onChange={this.handleChange}
                      style={{ marginLeft: "20px" }}
                    />
                  )}
                </div>
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal *"
                    value={tgl}
                    onChange={this.handleTanggal}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                    style={{ marginTop: 0 }}
                  />
                  <Grid item sm={12} xs={12} className="flex flex-between">
                    <KeyboardTimePicker
                      ampm={false}
                      className="w-full"
                      variant="inline"
                      format="H:mm"
                      margin="normal"
                      id="date-picker-inline"
                      label="Jam Mulai *"
                      value={jam_mulai}
                      onChange={this.handleJamMulai}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      size="small"
                      style={{ marginRight: "5px" }}
                    />
                    <KeyboardTimePicker
                      ampm={false}
                      className="w-full"
                      variant="inline"
                      format="H:mm"
                      margin="normal"
                      id="date-picker-inline"
                      label="Jam Selesai *"
                      value={jam_selesai}
                      onChange={this.handleJamSelesai}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      size="small"
                      // style={{ }
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full"
                  label="Catatan"
                  type="text"
                  name="catatan"
                  value={catatan}
                  // validators={["required"]}
                  // errorMessages={["Field is Required"]}
                  size="small"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  value={dataSigner.filter((item) => item.value == nama_signer)}
                  name="nama_signer"
                  options={dataSigner}
                  onChange={this.handleChangeSigner}
                  className="basic-multi-select"
                  placeholder="Mengetahui atasan *"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  value={optionDetail.filter((item) => item.value == type)}
                  name="type"
                  options={optionDetail}
                  onChange={this.handleChangeType}
                  className="basic-multi-select mb-4"
                  placeholder="Tipe Keterangan Pembahasan *"
                />
              </Grid>
            </Grid>

            {type == "table" && (
              <>
                <Grid container spacing={2}>
                  <Grid item sm={12} xs={12}>
                    <Table className="crud-table">
                      <TableHead className="bg-primary">
                        <TableRow>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            colSpan={4}
                          >
                            Pembahasan
                          </TableCell>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            colSpan={2}
                          >
                            Tindak lanjut
                          </TableCell>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            align="center"
                            colSpan={2}
                          >
                            PIC
                          </TableCell>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            align="center"
                            colSpan={2}
                          >
                            Target
                          </TableCell>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            align="center"
                            colSpan={2}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            className="py-2 font-poppins font-bold text-white pl-2"
                            align="center"
                            colSpan={1}
                          >
                            &nbsp;
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="mt-2">
                        {pembahasanTable.map((detail, index) => (
                          <TableRow hover key={index}>
                            <TableCell
                              className="font-poppins p-"
                              align="center"
                              colSpan={4}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Pembahasan *"
                                type="text"
                                name="pembahasan"
                                id={"" + index}
                                value={detail.pembahasan}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                                onChange={this.handleChangeItem}
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={2}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Tindak Lanjut *"
                                type="text"
                                name="tindak_lanjut"
                                value={detail.tindak_lanjut}
                                id={"" + index}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                                onChange={this.handleChangeItem}
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={2}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="PIC *"
                                onChange={this.handleChangeItem}
                                type="text"
                                name="pic"
                                value={detail.pic}
                                id={index}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={2}
                            >
                              <TextValidator
                                variant="outlined"
                                className="w-full mb-3"
                                label="Target *"
                                onChange={this.handleChangeItem}
                                type="text"
                                name="target"
                                value={detail.target}
                                id={index}
                                validators={["required"]}
                                errorMessages={["Field is Required"]}
                                size="small"
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={2}
                            >
                              <Select
                                value={optionStatus.filter(
                                  (item) => item.value == detail.status
                                )}
                                name="status"
                                options={optionStatus}
                                onChange={(e) =>
                                  this.handleChangeItemSelect(e, index)
                                }
                                className="basic-multi-select mb-3"
                              />
                            </TableCell>
                            <TableCell
                              className="font-poppins p-1"
                              align="center"
                              colSpan={1}
                            >
                              <div className="mb-3">
                                <Button
                                  variant="contained"
                                  size="small"
                                  className={
                                    "text-white elevation-z0 " +
                                      pembahasanTable.length ==
                                    1
                                      ? ""
                                      : "bg-error"
                                  }
                                  onClick={() => this.deleteItem(detail.index)}
                                  disabled={
                                    pembahasanTable.length == 1 ? true : false
                                  }
                                >
                                  <Icon className={`text-white`}>delete</Icon>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button
                      variant="contained"
                      className="bg-secondary text-white elevation-z0 mb-4"
                      onClick={this.addItemPembahasan}
                    >
                      Tambah Item
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            {type == "text" && (
              <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                  <TextareaAutosize
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Tulis Pembahasan"
                    value={pembahasan}
                    onChange={(e) =>
                      this.setState({ pembahasan: e.currentTarget.value })
                    }
                    style={{
                      width: "100%",
                      minHeight: "200px",
                      minWidth: "100%",
                      fontFamily: "Roboto",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                    }}
                  />
                </Grid>
              </Grid>
            )}
            <br />
            <br />
            <div className="w-full text-right">
              <ButtonGroup className="mt-3">
                <Button
                  variant="contained"
                  color="default"
                  type="button"
                  component={Link}
                  to={"/mom"}
                >
                  Batal
                </Button>
                {type && (
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
                )}
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
    MOMWith: state.mom.MOMWith,
    detailMOM: state.mom.detailMOM,
    dataSigner: state.signer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    // getKaryawan: (type) => dispatch(getKaryawan(type)),
    editMOM: (params) => dispatch(editMOM(params)),
    getMOMWith: (type) => dispatch(getMOMWith(type)),
    getDetailMOM: (id) => dispatch(getDetailMOM(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditMOM);
