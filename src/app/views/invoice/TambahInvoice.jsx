import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch,
} from "@material-ui/core";
import {
  formatHarga,
  konversiRomawi,
  formatDollar,
} from "app/utils/globalFunction";
import { getPelanggan } from "app/redux/actions/PelangganActions";
import { SimpleCard } from "matx";
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
import DateFnsUtils from "@date-io/date-fns";
import Select from "react-select";
import { addInvoice } from "app/redux/actions/InvoiceActions";
import { getAllHeader } from "app/redux/actions/SignerActions";

class TambahInvoice extends Component {
  constructor() {
    super();
    this.state = {
      no_invoice: "",
      perihal: "",
      nama_pelanggan: "",
      kop_code: "",
      email: "",
      perusahaan: "",
      telepon: "",
      tanggal_dikirim: "",
      tanggal_jatuh_tempo: "",
      fitur: [
        {
          index: 0,
          nama: "",
          biaya: 0,
          qty: 0,
          total: 0,
        },
      ],
      pembayaran: "",
      catatan: "",
      sub_total: 0,
      submit: 0,
      v_tanggal_dikirim: new Date(),
      v_tanggal_jatuh: new Date(),
      metode: "a",
      jml_term: 3,
      termin: [],
      total_biaya: 0,
      ppn: 0,
      term1: 0,
      term2: 0,
      term3: 0,
      optionPelanggan: [],
      nik: "",
      npwp: "",
      ppnChecked: true,
      dataCurrency: [
        {
          label: "Rp",
          value: "Rp",
        },
        {
          label: "$",
          value: "$",
        },
      ],
      currency: "",
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
    const { getPelanggan, dataPelanggan, getAllHeader } = this.props;
    getPelanggan();
    getAllHeader("list");

    this.setState({
      optionPelanggan: dataPelanggan,
    });
  }

  handleChange = (e) => {
    e.persist();
    const { jml_term } = this.state;
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        if (e.target?.name == "metode") {
          this.handleChangeTerm(jml_term);
        }
      }
    );
  };

  handleChangeChecked = (e) => {
    e.persist();
    const { jml_term, ppnChecked } = this.state;
    this.setState(
      {
        [e.target.name]: !ppnChecked,
      },
      () => {
        // if (e.target?.name == "metode") {
        this.handleChangeTerm(jml_term);
        // }
      }
    );
  };

  handleChangeTerm = (e) => {
    let { fitur, metode, ppnChecked } = this.state;
    let term1, term2, term3;
    let a = e.target?.value || e;
    let value = Number(a);
    let total = 0;
    for (let a = 0; a < fitur.length; a++) {
      total += Number(fitur[a].total);
    }
    let ppn = ppnChecked ? (total * 11) / 100 : 0;
    if (metode == "standar") {
      let dp = (total * 50) / 100;
      let bagi = (total - dp) / (value - 1);
      let termin = [];
      for (let i = 0; i < value; i++) {
        let nominal = i == 0 ? dp : bagi;
        let data = {
          index: i,
          nominal: nominal,
        };
        termin.push(data);
      }
      this.setState({
        jml_term: value,
        dp: value,
        termin: termin,
        total_biaya: total + ppn,
        sub_total: total,
        ppn: ppn,
      });
    } else if (metode == "medium") {
      term1 = (total * 55) / 100;
      term2 = (total * 35) / 100;
      term3 = (total * 10) / 100;

      this.setState({
        term1: term1,
        term2: term2,
        term3: term3,
        total_biaya: total + ppn,
        sub_total: total,
        ppn: ppn,
      });
    } else if (metode == "high") {
      term1 = (total * 60) / 100;
      term2 = (total * 40) / 100;

      this.setState({
        term1: term1,
        term2: term2,
        total_biaya: total + ppn,
        sub_total: total,
        ppn: ppn,
      });
    } else if (metode == "custom") {
      let dp = total;
      let termin = [];
      for (let i = 0; i < value; i++) {
        let nominal = i == 0 ? dp : 0;
        let persen = i == 0 ? 100 : 0;
        let data = {
          index: i,
          nominal: nominal,
          persen: persen,
        };
        termin.push(data);
      }
      this.setState({
        jml_term: value,
        dp: value,
        termin: termin,
        total_biaya: total + ppn,
        sub_total: total,
        ppn: ppn,
      });
    } else {
      this.setState({
        total_biaya: total + ppn,
        ppn: ppn,
        sub_total: total,
      });
    }
  };

  handleChangeItem = (e) => {
    let idx = e.target.id;
    let { fitur, jml_term } = this.state;
    let newFitur = fitur;
    newFitur[idx][e.target.name] = e.target.value;
    this.setState({
      fitur: newFitur,
    });
    this.handleChangeTerm(jml_term);
  };

  handleChangePersen = (e) => {
    console.log(e.target.id);
    let idx = e.target.id;
    let { termin, jml_term, total_biaya, sub_total } = this.state;
    let newTermin = termin;
    newTermin[idx]["persen"] = e.target.value;
    newTermin[idx]["nominal"] = (sub_total * Number(e.target.value)) / 100;
    console.log(newTermin);
    this.setState({
      termin: newTermin,
    });
    // this.handleChangeTerm(jml_term);
  };

  handleChangeItemQty = (e) => {
    let idx = e.target.id;
    let { fitur, jml_term } = this.state;
    let newFitur = fitur;
    let biaya = newFitur[idx]["biaya"];
    newFitur[idx][e.target.name] = e.target.value;
    newFitur[idx]["total"] = e.target.value * biaya;
    this.setState({
      fitur: newFitur,
    });
    this.handleChangeTerm(jml_term);
  };

  handleChangeItemBiaya = (e) => {
    let idx = e.target.id;
    let { fitur, jml_term, currency } = this.state;
    let newFitur = fitur;
    let a = 0;
    if (currency == "Rp") {
      a = Number(
        e.target.value
          .replaceAll(",", "")
          .replaceAll(".", "")
          .replaceAll("$", "")
      );
    } else {
      a = Number(
        e.target.value
          .replaceAll(".00", "")
          .replaceAll(",", "")
          .replaceAll("$", "")
      );
    }

    if (typeof a == "number") {
      newFitur[idx][e.target.name] = a;
      this.setState({
        fitur: newFitur,
      });
      this.handleChangeTerm(jml_term);
    }
  };

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
      nama_pelanggan,
      kop_code,
      perihal,
      v_tanggal_dikirim,
      v_tanggal_jatuh,
      catatan,
      fitur,
      metode,
      termin,
      term1,
      term2,
      term3,
      ppn,
      total_biaya,
      npwp,
      nik,
      sub_total,
      currency,
    } = this.state;

    let params = {
      perihal: perihal,
      pelanggan_code: nama_pelanggan,
      kop_code: kop_code,
      tgl_dikirim: v_tanggal_dikirim,
      tgl_jatuh_tempo: v_tanggal_jatuh,
      catatan: catatan,
      termin: termin,
      inv_content: fitur,
      model_pembayaran: metode,
      ppn: ppn,
      total_biaya: total_biaya,
      nik: nik,
      npwp: npwp,
      sub_total: sub_total,
      currency: currency,
    };
    // console.log(metode);
    if (metode == "a") {
      Swal.fire({
        title: "Gagal",
        text: "Silahkan Pilih Termin",
        timer: 2000,
        icon: "warning",
      }).then(() =>
        this.setState({
          submit: false,
        })
      );
    } else if (metode == "medium") {
      let mediumTermin = [
        {
          nominal: term1,
        },
        {
          nominal: term2,
        },
        {
          nominal: term3,
        },
      ];

      params.termin = mediumTermin;
      this.submitData(params);
    } else if (metode == "high") {
      let highTermin = [
        {
          nominal: term1,
        },
        {
          nominal: term2,
        },
      ];

      params.termin = highTermin;
      this.submitData(params);
    } else if (metode == "excellent") {
      params.termin = [];
      this.submitData(params);
    } else if (metode == "custom") {
      let persen = 0;
      for (let i = 0; i < params.termin.length; i++) {
        // console.log(params.termin[i]["persen"]);
        persen += Number(params.termin[i]["persen"]);
      }
      // console.log(persen);
      if (persen < 100) {
        Swal.fire({
          title: "Gagal !",
          text: "Persentase termin belum 100%",
          timer: 2000,
          icon: "warning",
        }).then(() =>
          this.setState({
            submit: false,
          })
        );
      } else if (persen > 100) {
        Swal.fire({
          title: "Gagal !",
          text: "Persentase termin lebih dari 100%",
          timer: 2000,
          icon: "warning",
        }).then(() =>
          this.setState({
            submit: false,
          })
        );
      } else {
        this.submitData(params);
      }
    } else {
      this.submitData(params);
    }
  }

  submitData(params) {
    const { addInvoice, history } = this.props;
    addInvoice(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/invoice");
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

  handleDateKirimChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal_dikirm: dateFormat,
      v_tanggal_dikirim: event,
    });
  };

  handleDateJatuhChange = (date) => {
    var event = new Date(date);

    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      tanggal_jatuh_tempo: dateFormat,
      v_tanggal_jatuh: event,
    });
  };

  addItem = () => {
    let { fitur } = this.state;
    let data = [
      {
        index: fitur.length + 1,
        nama: "",
        biaya: 0,
        qty: 0,
        total: 0,
      },
    ];

    let all = fitur.concat(data);

    this.setState({
      fitur: all,
    });
  };

  deleteItem = (index) => {
    let { fitur } = this.state;
    let newData = fitur.filter((item) => item.index != index);

    this.setState({
      fitur: newData,
    });
  };

  handleChangePelanggan = (val) => {
    this.setState({
      nama_pelanggan: val.value,
    });
  };

  handleChangeKop = (val) => {
    this.setState({
      kop_code: val.value,
    });
  };

  handleChangeCurrency = (val) => {
    this.setState({
      currency: val.value,
    });
  };

  render() {
    const {
      perihal,
      nama_pelanggan,
      kop_code,
      v_tanggal_dikirim,
      v_tanggal_jatuh,
      fitur,
      catatan,
      submit,
      metode,
      jml_term,
      termin,
      total_biaya,
      ppn,
      term1,
      term2,
      term3,
      sub_total,
      ppnChecked,
      currency,
      dataCurrency,
    } = this.state;
    const { dataPelanggan, dataKop } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Tambah Invoice">
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Select
                  defaultValue={kop_code}
                  name="kop_code"
                  options={dataKop}
                  onChange={this.handleChangeKop}
                  className="basic-multi-select mb-4"
                  placeholder="Kop Surat"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={nama_pelanggan}
                  name="nama_pelanggan"
                  options={dataPelanggan}
                  onChange={this.handleChangePelanggan}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Pelanggan"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Perihal"
                  onChange={this.handleChange}
                  type="text"
                  name="perihal"
                  value={perihal}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Invoice"
                    value={v_tanggal_dikirim}
                    onChange={this.handleDateKirimChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    className="w-full"
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Jatuh Tempo"
                    value={v_tanggal_jatuh}
                    onChange={this.handleDateJatuhChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label="Catatan"
                  onChange={this.handleChange}
                  type="text"
                  name="catatan"
                  value={catatan}
                  validators={["required"]}
                  errorMessages={["Field is Required"]}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={currency}
                  name="currency"
                  options={dataCurrency}
                  onChange={this.handleChangeCurrency}
                  className="basic-multi-select mb-4"
                  placeholder="Mata Uang"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Table className="crud-table">
                  <TableHead className="bg-primary">
                    <TableRow>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        colSpan={3}
                      >
                        Nama Proyek
                      </TableCell>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        colSpan={3}
                      >
                        Biaya Proyek
                      </TableCell>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        colSpan={1}
                      >
                        Qty
                      </TableCell>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        colSpan={3}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        align="center"
                        colSpan={1}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="mt-2">
                    {fitur.map((item, index) => (
                      <TableRow hover key={index}>
                        <TableCell
                          className="font-poppins p-"
                          align="center"
                          colSpan={3}
                        >
                          <TextValidator
                            variant="outlined"
                            className="w-full mb-3"
                            label="Nama Proyek"
                            onChange={this.handleChangeItem}
                            type="text"
                            name="nama"
                            id={"" + index}
                            value={item.nama}
                            validators={["required"]}
                            errorMessages={["Field is Required"]}
                            size="small"
                            // helperText={formatRupiah(saldo, mata_uang)}
                          />
                        </TableCell>
                        <TableCell
                          className="font-poppins p-1"
                          align="center"
                          colSpan={3}
                        >
                          <TextValidator
                            variant="outlined"
                            className="w-full mb-3"
                            label="Biaya Proyek"
                            onChange={this.handleChangeItemBiaya}
                            type="text"
                            name="biaya"
                            value={
                              currency == "Rp"
                                ? formatHarga(item.biaya)
                                : formatDollar(item.biaya)
                            }
                            id={"" + index}
                            validators={["required"]}
                            errorMessages={["Field is Required"]}
                            size="small"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {currency}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </TableCell>
                        <TableCell
                          className="font-poppins p-1"
                          align="center"
                          colSpan={1}
                        >
                          <TextValidator
                            variant="outlined"
                            className="w-full mb-3"
                            label="Qty"
                            onChange={this.handleChangeItemQty}
                            type="number"
                            name="qty"
                            value={item.qty}
                            id={"" + index}
                            validators={["required"]}
                            errorMessages={["Field is Required"]}
                            size="small"
                            // helperText={formatRupiah(item.biaya, 'Rp')}
                          />
                        </TableCell>
                        <TableCell
                          className="font-poppins p-1"
                          align="center"
                          colSpan={3}
                        >
                          <TextValidator
                            variant="outlined"
                            className="w-full mb-3"
                            label="Total"
                            onChange={this.handleChangeItem}
                            type="text"
                            name="total"
                            value={
                              currency == "Rp"
                                ? formatHarga(item.total)
                                : formatDollar(item.total)
                            }
                            id={"" + index}
                            validators={["required"]}
                            errorMessages={["Field is Required"]}
                            size="small"
                            disabled
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {currency}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </TableCell>
                        <TableCell
                          className="font-poppins pt-0"
                          align="center"
                          colSpan={1}
                        >
                          <Button
                            variant="contained"
                            className={
                              " text-white elevation-z0 " + fitur.length == 1
                                ? ""
                                : "bg-error"
                            }
                            onClick={() => this.deleteItem(item.index)}
                            disabled={fitur.length == 1 ? true : false}
                          >
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              className="bg-secondary text-white elevation-z0 mb-4"
              onClick={this.addItem}
            >
              Tambah Item
            </Button>
            <br />
            <Grid
              container
              spacing={2}
              style={{ justifyContent: "flex-end", alignItems: "center" }}
            >
              <h4 className="mb-6 mr-3">Sub Total</h4>
              <Grid item sm={4} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label=""
                  onChange={this.handleChangeItem}
                  type="text"
                  name="sub_total"
                  value={
                    currency == "Rp"
                      ? formatHarga(sub_total)
                      : formatDollar(sub_total)
                  }
                  disabled
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {currency}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              style={{ justifyContent: "flex-end", alignItems: "center" }}
            >
              <h4 className="mb-6 mr-3">PPN({ppnChecked ? "11" : "0"}%)</h4>
              <Grid item sm={3} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label=""
                  onChange={this.handleChangeItem}
                  type="text"
                  name="ppn"
                  value={
                    currency == "Rp" ? formatHarga(ppn) : formatDollar(ppn)
                  }
                  disabled
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {currency}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={1} xs={6}>
                <Switch
                  checked={ppnChecked}
                  onChange={this.handleChangeChecked}
                  name="ppnChecked"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              style={{ justifyContent: "flex-end", alignItems: "center" }}
            >
              <h4 className="mb-6 mr-3">Total Biaya</h4>
              <Grid item sm={4} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-full mb-3"
                  label=""
                  onChange={this.handleChangeItem}
                  type="text"
                  name="total_biaya"
                  value={
                    currency == "Rp"
                      ? formatHarga(total_biaya)
                      : formatDollar(total_biaya)
                  }
                  disabled
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {currency}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <SelectValidator
                  variant="outlined"
                  className="mb-4 w-full"
                  label="Pilih Standar Pembayaran"
                  onChange={this.handleChange}
                  name="metode"
                  value={metode || ""}
                  size="small"
                >
                  <MenuItem value="a" disabled>
                    <em>Pilih Standar Pembayaran</em>
                  </MenuItem>
                  <MenuItem value="standar">Standar</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="excellent">Excellent</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </SelectValidator>
              </Grid>
              {metode == "standar" || metode == "custom" ? (
                <Grid item sm={2} xs={12}>
                  <TextValidator
                    variant="outlined"
                    className="w-full mb-3"
                    label="Jumlah Termin"
                    onChange={this.handleChangeTerm}
                    type="number"
                    name="jml_term"
                    value={jml_term}
                    helperText="Harus lebih dari 2"
                    size="small"
                  />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            {metode == "standar"
              ? termin.map((item, index) => (
                  <Grid
                    container
                    spacing={2}
                    style={{ justifyContent: "flex-end", alignItems: "center" }}
                  >
                    <h4 className="mb-6 mr-3">
                      {index == 0 ? "DP" : "Term " + konversiRomawi(index)}
                    </h4>
                    <Grid item sm={4} xs={12}>
                      <TextValidator
                        variant="outlined"
                        className="w-full mb-3"
                        label=""
                        onChange={this.handleChangeItem}
                        type="text"
                        name="term"
                        value={
                          currency == "Rp"
                            ? formatHarga(item.nominal)
                            : formatDollar(item.nominal)
                        }
                        disabled
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {currency}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                ))
              : ""}
            {metode == "medium" ? (
              <>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "flex-end", alignItems: "center" }}
                >
                  <h4 className="mb-6 mr-3">Term {konversiRomawi(1)}</h4>
                  <Grid item sm={4} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label=""
                      onChange={this.handleChangeItem}
                      type="text"
                      name="term1"
                      value={
                        currency == "Rp"
                          ? formatHarga(term1)
                          : formatDollar(term1)
                      }
                      disabled
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {currency}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "flex-end", alignItems: "center" }}
                >
                  <h4 className="mb-6 mr-3">Term {konversiRomawi(2)}</h4>
                  <Grid item sm={4} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label=""
                      onChange={this.handleChangeItem}
                      type="text"
                      name="term2"
                      value={
                        currency == "Rp"
                          ? formatHarga(term2)
                          : formatDollar(term2)
                      }
                      disabled
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {currency}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "flex-end", alignItems: "center" }}
                >
                  <h4 className="mb-6 mr-3">Term {konversiRomawi(3)}</h4>
                  <Grid item sm={4} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label=""
                      onChange={this.handleChangeItem}
                      type="text"
                      name="term3"
                      value={
                        currency == "Rp"
                          ? formatHarga(term3)
                          : formatDollar(term3)
                      }
                      disabled
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {currency}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              ""
            )}
            {metode == "high" ? (
              <>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "flex-end", alignItems: "center" }}
                >
                  <h4 className="mb-6 mr-3">Term {konversiRomawi(1)}</h4>
                  <Grid item sm={4} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label=""
                      onChange={this.handleChangeItem}
                      type="text"
                      name="term1"
                      value={
                        currency == "Rp"
                          ? formatHarga(term1)
                          : formatDollar(term1)
                      }
                      disabled
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {currency}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "flex-end", alignItems: "center" }}
                >
                  <h4 className="mb-6 mr-3">Term {konversiRomawi(2)}</h4>
                  <Grid item sm={4} xs={12}>
                    <TextValidator
                      variant="outlined"
                      className="w-full mb-3"
                      label=""
                      onChange={this.handleChangeItem}
                      type="text"
                      name="term2"
                      value={
                        currency == "Rp"
                          ? formatHarga(term2)
                          : formatDollar(term2)
                      }
                      disabled
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {currency}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              ""
            )}
            {metode == "custom"
              ? termin.map((item, index) => (
                  <Grid
                    container
                    spacing={2}
                    style={{ justifyContent: "flex-end", alignItems: "center" }}
                  >
                    <h4 className="mb-6 mr-3">
                      {index == 0 ? "DP" : "Term " + konversiRomawi(index)}
                    </h4>
                    <Grid item sm={2} xs={12}>
                      <TextValidator
                        variant="outlined"
                        className="w-full mb-3"
                        label="Persen"
                        onChange={this.handleChangePersen}
                        type="number"
                        name="persen"
                        value={item.persen}
                        size="small"
                        id={"" + index}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">%</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <TextValidator
                        variant="outlined"
                        className="w-full mb-3"
                        label=""
                        onChange={this.handleChangeItem}
                        type="text"
                        name="term"
                        value={
                          currency == "Rp"
                            ? formatHarga(item.nominal)
                            : formatDollar(item.nominal)
                        }
                        disabled
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {currency}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                ))
              : ""}
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
    dataKop: state.signer.dataKop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPelanggan: () => dispatch(getPelanggan()),
    addInvoice: (params) => dispatch(addInvoice(params)),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TambahInvoice);
