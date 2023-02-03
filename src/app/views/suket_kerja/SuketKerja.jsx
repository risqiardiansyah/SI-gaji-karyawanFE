import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@material-ui/core';
import { SimpleCard } from 'matx';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { formatTanggal } from 'app/utils/globalFunction';
import {
  getAllSuket,
  delSuket,
  downloadSuket,
} from 'app/redux/actions/SuketAction';

class SuketKerja extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      search: '',
      page: 0,
      rowsPerPage: 10,
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
    this.getData();
  }
  getData() {
    const { getAllSuket } = this.props;
    getAllSuket();
  }
  handleCloseEdit = () => {
    this.setState(
      {
        printPopUp: false,
      },
      () => {
        this.getData();
      }
    );
  };

  handleDelete = (id) => {
    const { delSuket, getAllSuket } = this.props;
    Swal.fire({
      title: 'Hapus',
      text: 'Apakah kamu yakin ?',
      showCancelButton: true,
      confirmButtonText: 'Yakin',
      cancelButtonText: 'Batal',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        const params = {
          unique_code: id,
        };
        delSuket(params)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: 'Berhasil',
                text: 'Data berhasil dihapus',
                timer: 2000,
                icon: 'success',
              });
              getAllSuket();
            }
          })
          .catch((err) => {
            Swal.fire({
              title: 'gagal',
              text: 'Data Gagal dihapus',
              timer: 2000,
              icon: 'error',
            });
          });
      }
    });
  };

  handleEdit = (param) => {
    const { history } = this.props;
    history.push(`/edit/suket_kerja/${param}`);
  };

  handlePrint = (item, send_email) => {
    Swal.fire({
      title: 'Mohon Tunggu !',
      html: 'Mengambil Data..',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 7000,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const { downloadSuket } = this.props;

    downloadSuket(item.unique_code, send_email).then((res) => {
      window.open(res.data.pdf_path);
    });
  };

  renderTable = () => {
    const { page, rowsPerPage, search } = this.state;
    const { dataSuket } = this.props;
    console.log(dataSuket);

    return dataSuket?.length > 0 ? (
      dataSuket
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(
          (item) =>
            item.karyawan_nama?.toLowerCase().includes(search.toLowerCase()) ||
            item.signer_name?.toLowerCase().includes(search.toLowerCase())
        )
        .filter((item) => item.category === 1)
        .map((item, index) => {
          return (
            <TableRow hover key={index}>
              <TableCell className="pl-2">{index + 1}</TableCell>
              <TableCell colSpan={2}>{item.karyawan_nama}</TableCell>
              <TableCell colSpan={2}>{item.signer_name}</TableCell>
              <TableCell colSpan={2}>
                {formatTanggal(item.created_at)}
              </TableCell>
              <TableCell colSpan={2}>{item.position}</TableCell>
              <TableCell align="center" colSpan={3}>
                <ButtonGroup aria-label="group">
                  <Button
                    onClick={() => this.handleEdit(item.unique_code)}
                    variant="contained"
                    className="bg-primary text-white elevation-z0"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => this.handlePrint(item, 0)}
                    variant="contained"
                    className="bg-secondary text-white elevation-z0"
                  >
                    View Pdf
                  </Button>

                  <Button
                    onClick={() => this.handleDelete(item.unique_code)}
                    variant="contained"
                    className="bg-error text-white elevation-z0"
                  >
                    Hapus
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          );
        })
    ) : (
      <TableRow hover>
        <TableCell colSpan={12} align="center">
          {' '}
          Data kosong{' '}
        </TableCell>
      </TableRow>
    );
  };

  handleAdd = () => {
    const { history } = this.props;
    history.push('/tambah/suket_kerja');
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { search, page, rowsPerPage } = this.state;
    const { dataSuket } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard
          loading={false}
          title="Suket Kerja"
          subtitle="Data Surat Keterangan Kerja"
        >
          <Fragment>
            <Grid
              container
              spacing={2}
              justify="space-between"
              className="my-4"
            >
              <Grid item lg={5} md={5} sm={12} xs={12} className="mb-4">
                <ButtonGroup aria-label="group">
                  <Button
                    onClick={() => this.handleAdd()}
                    variant="contained"
                    color="primary"
                    className="elevation-z0 font-medium"
                  >
                    Tambah Suket Kerja
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <div className="flex items-center">
                  <TextField
                    variant="standard"
                    className="w-full"
                    placeholder="Cari"
                    onChange={this.handleChange}
                    value={search}
                    name="search"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon>search</Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </Grid>
            </Grid>
            <div className="w-full overflow-auto bg-white">
              <Table className="buku-kas-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="pl-2">No</TableCell>
                    <TableCell colSpan={2}>Nama</TableCell>
                    <TableCell colSpan={2}>Signer</TableCell>
                    <TableCell colSpan={2}>Tanggal Dibuat</TableCell>
                    <TableCell colSpan={2}>Position</TableCell>

                    <TableCell align="center" colSpan={3}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTable()}</TableBody>
              </Table>
              <TablePagination
                className="px-16"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dataSuket?.length ? dataSuket?.length : 0}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={'From'}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next page',
                }}
                backIconButtonText="Previous page"
                nextIconButtonText="Next page"
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.setRowsPerPage}
              />
            </div>
          </Fragment>
        </SimpleCard>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataSuket: state.suket.dataSuket,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllSuket: () => dispatch(getAllSuket()),
    delSuket: (params) => dispatch(delSuket(params)),
    downloadSuket: (sk_code, send_email) =>
      dispatch(downloadSuket(sk_code, send_email)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SuketKerja);
