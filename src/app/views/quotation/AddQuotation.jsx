import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { formatHarga } from "app/utils/globalFunction";
import { SimpleCard } from "matx";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Select from "react-select";
import { getSigner } from "app/redux/actions/SignerActions";
import { getPelanggan } from "app/redux/actions/PelangganActions";
import { addQuotation } from "app/redux/actions/QuotationAction";
import { getAllHeader } from "app/redux/actions/SignerActions";

class AddQuotation extends Component {
  constructor() {
    super();
    this.state = {
      quotation_date: new Date(),
      about: "",
      quotation_item: [
        {
          index: 0,
          description: "",
          price: 0,
          qty: 0,
          total_price: 0,
        },
      ],
      submit: false,
      nama_mitra: "",
      nama_signer: "",
      total_biaya: 0,
      optionMitra: [],
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
    };
  }

  componentDidMount() {
    const { getSigner, dataPelanggan, getPelanggan, dataSigner, getAllHeader } =
      this.props;
    const { quotation_date } = this.state;
    getSigner();
    getPelanggan();
    getAllHeader("list");

    let mulai = JSON.stringify(quotation_date);
    mulai = mulai.slice(1, 11);

    this.setState({
      optionMitra: dataPelanggan,
      optionSigner: dataSigner,
      quotation_date: mulai,
    });
  }

  handleChangeItem = (e) => {
    let idx = e.target.id;
    let { quotation_item } = this.state;
    let newQuotationItem = quotation_item;
    newQuotationItem[idx][e.target.name] = e.target.value;
    this.setState({
      quotation_item: newQuotationItem,
    });
  };

  handleChangeItemQty = (e) => {
    let idx = e.target.id;
    let { quotation_item } = this.state;
    let newQuotationItem = quotation_item;
    let biaya = newQuotationItem[idx]["price"];
    newQuotationItem[idx][e.target.name] = e.target.value;
    newQuotationItem[idx]["total_price"] = e.target.value * biaya;
    this.setState(
      {
        quotation_item: newQuotationItem,
      },
      () => this.handleHitungTotal()
    );
  };

  handleHitungTotal = () => {
    let { quotation_item } = this.state;
    let total = 0;

    quotation_item.forEach((item) => (total += item.total_price));

    this.setState({
      total_biaya: total,
    });
  };

  handleChangeItemBiaya = (e) => {
    let idx = e.target.id;
    let { quotation_item } = this.state;
    let newQuotationItem = quotation_item;
    let a = Number(e.target.value.replaceAll(",", "").replaceAll(".", ""));
    if (typeof a == "number") {
      let qty = newQuotationItem[idx]["qty"];
      newQuotationItem[idx]["total_price"] = a * qty;
      newQuotationItem[idx][e.target.name] = a;
      this.setState(
        {
          quotation_item: newQuotationItem,
        },
        () => this.handleHitungTotal()
      );
    }
  };

  submitForm = () => this.setState({ submit: true }, () => this.sendSubmit());

  sendSubmit() {
    const {
      quotation_date,
      about,
      quotation_item,
      nama_mitra,
      nama_signer,
      currency,
      bahasa,
      kop_code,
    } = this.state;

    const params = {
      quotation_date: quotation_date,
      mitra_code: nama_mitra,
      signer_code: nama_signer,
      about: about,
      quotation_item: quotation_item,
      currency: currency,
      bahasa: bahasa,
      kop_code: kop_code,
    };

    this.submitData(params);
  }

  submitData(params) {
    const { addQuotation, history } = this.props;
    addQuotation(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            timer: 2000,
            icon: "success",
          }).then(() => {
            history.push("/quotation");
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

  handleSendDate = (date) => {
    let event = new Date(date);
    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, 11);
    this.setState({
      quotation_date: dateFormat,
    });
  };

  addItem = () => {
    let { quotation_item } = this.state;
    let data = [
      {
        index: quotation_item.length + 1,
        description: "",
        price: 0,
        qty: 0,
        total_price: 0,
      },
    ];

    let all = quotation_item.concat(data);

    this.setState({
      quotation_item: all,
    });
  };

  deleteItem = (index) => {
    let { quotation_item } = this.state;
    let newData = quotation_item.filter((item) => item.index != index);

    this.setState(
      {
        quotation_item: newData,
      },
      () => this.handleHitungTotal()
    );
  };

  handleChangeMitra = (val) => {
    this.setState({
      nama_mitra: val.value,
    });
  };

  handleChangeSigner = (val) => {
    this.setState({
      nama_signer: val.value,
    });
  };

  handleChangeCurrency = (val) => {
    this.setState({
      currency: val.value,
    });
  };

  handleLanguage = (val) => {
    this.setState({
      bahasa: val.value,
    });
  };

  handleChangeLayanan = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeKop = (val) => {
    this.setState({
      kop_code: val.value,
    });
  };

  render() {
    const {
      nama_mitra,
      nama_signer,
      quotation_date,
      quotation_item,
      about,
      submit,
      total_biaya,
      dataCurrency,
      currency,
      dataLanguage,
      bahasa,
      kop_code,
    } = this.state;
    const { dataPelanggan, dataSigner, dataKop } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Tambah Quotation">
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Select
                  value={dataKop.filter((item) => item.value == kop_code)}
                  name="kop_code"
                  options={dataKop}
                  onChange={this.handleChangeKop}
                  className="basic-multi-select mb-4"
                  placeholder="Kop Surat"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={nama_mitra}
                  name="nama_mitra"
                  options={dataPelanggan}
                  onChange={this.handleChangeMitra}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Mitra"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={nama_signer}
                  name="nama_signer"
                  options={dataSigner}
                  onChange={this.handleChangeSigner}
                  className="basic-multi-select mb-4"
                  placeholder="Nama Signer"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item sm={6} xs={12}>
                  <KeyboardDatePicker
                    disableToolbar
                    className="w-full mt-0"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Tanggal Quotation"
                    value={quotation_date}
                    onChange={this.handleSendDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextValidator
                    variant="outlined"
                    className="w-full mb-3"
                    label="Permintaan Layanan"
                    onChange={this.handleChangeLayanan}
                    type="text"
                    name="about"
                    value={about}
                    validators={["required"]}
                    errorMessages={["Field is Required"]}
                    size="small"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
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
              <Grid item sm={6} xs={12}>
                <Select
                  defaultValue={bahasa}
                  name="bahasa"
                  options={dataLanguage}
                  onChange={this.handleLanguage}
                  className="basic-multi-select mb-4"
                  placeholder="Bahasa"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}></Grid>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Table className="crud-table">
                  <TableHead className="bg-primary">
                    <TableRow>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        colSpan={3}
                      >
                        Deskripsi
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
                        Harga Satuan
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
                    {quotation_item.map((item, index) => (
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
                            name="description"
                            id={"" + index}
                            value={item.description}
                            validators={["required"]}
                            errorMessages={["Field is Required"]}
                            size="small"
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
                            name="price"
                            value={formatHarga(item.price)}
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
                          colSpan={3}
                        >
                          <TextValidator
                            variant="outlined"
                            className="w-full mb-3"
                            label="Total"
                            onChange={this.handleChangeItem}
                            type="text"
                            name="total_price"
                            value={formatHarga(item.total_price)}
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
                            disabled
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
                              " text-white elevation-z0 " +
                                quotation_item.length ==
                              1
                                ? ""
                                : "bg-error"
                            }
                            onClick={() => this.deleteItem(item.index)}
                            disabled={quotation_item.length == 1 ? true : false}
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
              <h4 className="mb-6 mr-3">Total Biaya</h4>
              <Grid item sm={4} xs={12}>
                <TextValidator
                  disabled
                  variant="outlined"
                  className="w-full mb-3"
                  onChange={this.handleHitungTotal}
                  type="text"
                  name="total_biaya"
                  value={formatHarga(total_biaya)}
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
    dataKop: state.signer.dataKop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSigner: () => dispatch(getSigner()),
    getPelanggan: () => dispatch(getPelanggan()),
    addQuotation: (params) => dispatch(addQuotation(params)),
    getAllHeader: (type) => dispatch(getAllHeader(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddQuotation);
