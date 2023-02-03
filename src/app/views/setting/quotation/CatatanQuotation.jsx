import {
  AppBar,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tab,
} from '@material-ui/core';
import { SimpleCard } from 'matx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {
  editQuotationCatatan,
  getCatatanQuotation,
} from 'app/redux/actions/WebSettingActions';

class CatatanQuotation extends Component {
  constructor() {
    super();
    this.state = {
      catatan: [
        {
          idx: 0,
          text: '',
          bahasa: 'ind',
        },
        {
          idx: 1,
          text: '',
          bahasa: 'eng',
        },
      ],
      submit: 0,
      bahasa: 'ind',
      value: 0,
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
    const { getCatatanQuotation, dataCatatan } = this.props;
    getCatatanQuotation();

    this.setState({
      catatan: dataCatatan,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      catatan: nextProps.dataCatatan,
    });
  }

  handleChange = (e) => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeItem = (e) => {
    let idx = e.target.id;
    let { catatan, bahasa } = this.state;
    let newCatatan = catatan;
    newCatatan[idx - 1][e.target.name] = e.target.value;

    this.setState({
      text: newCatatan,
    });
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
    const { catatan, bahasa } = this.state;

    let params = {
      catatan: catatan,
      bahasa: bahasa,
    };
    this.submitData(params);
  }

  submitData(params) {
    const { editQuotationCatatan } = this.props;
    editQuotationCatatan(params)
      .then((res) => {
        if (res.code === 0) {
          Swal.fire({
            title: 'Berhasil',
            text: 'Data berhasil disimpan',
            timer: 2000,
            icon: 'success',
          }).then(() => {
            this.setState({
              submit: 0,
            });
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'Gagal',
          text: 'Data gagal disimpan',
          timer: 2000,
          icon: 'error',
        }).then(() =>
          this.setState({
            submit: false,
          })
        );
      });
  }

  addItem = () => {
    let { catatan, bahasa } = this.state;
    let data = [
      {
        idx: catatan.length + 1,
        text: '',
        bahasa: bahasa,
      },
    ];

    let all = catatan.concat(data);

    this.setState({
      catatan: all,
    });
  };

  deleteItem = (idx) => {
    let { catatan, bahasa } = this.state;
    let newData = catatan.filter((item) => item.idx !== idx);

    this.setState({
      catatan: newData,
      bahasa: bahasa,
    });
  };

  handleChangeTab = () => {
    const { bahasa, value } = this.state;
    this.setState({
      bahasa: bahasa === 'ind' ? 'eng' : 'ind',
      value: value === 0 ? 1 : 0,
    });
  };

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  render() {
    const { catatan, submit, bahasa, value } = this.state;

    return (
      <div className="m-sm-30">
        <SimpleCard loading={false} title="Edit Catatan">
          <AppBar position="static" className="headerTab">
            <Tabs value={value} onChange={this.handleChangeTab}>
              <Tab label="Indonesia" {...this.a11yProps(0)} />
              <Tab label="English" {...this.a11yProps(1)} />
            </Tabs>
          </AppBar>
          <ValidatorForm ref="form" onSubmit={this.submitForm}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Table className="crud-table">
                  <TableHead className="bg-primary">
                    <TableRow>
                      <TableCell
                        className="py-2 font-poppins font-bold text-white pl-2"
                        colSpan={3}
                      >
                        Catatan
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
                    {catatan
                      .filter((item) => item.bahasa === bahasa)
                      .map((item, idx) => (
                        <TableRow hover key={idx}>
                          <TableCell
                            className="font-poppins p-"
                            align="center"
                            colSpan={3}
                          >
                            <TextValidator
                              variant="outlined"
                              className="w-full mb-3"
                              label="Catatan"
                              onChange={this.handleChangeItem}
                              type="text"
                              name="text"
                              id={item.idx}
                              value={item.text}
                              validators={['required']}
                              errorMessages={['Field is Required']}
                              size="small"
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
                                ' text-white elevation-z0 ' + catatan.length ==
                                1
                                  ? ''
                                  : 'bg-error'
                              }
                              onClick={() => this.deleteItem(item.idx)}
                              disabled={catatan.length == 1 ? true : false}
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
              className="bg-secondary text-white elevation-z0 mb-4 mt-4"
              onClick={this.addItem}
            >
              Tambah Item
            </Button>
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
                    'Simpan '
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
    dataCatatan: state.setting.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editQuotationCatatan: (params) => dispatch(editQuotationCatatan(params)),
    getCatatanQuotation: () => dispatch(getCatatanQuotation()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CatatanQuotation);
