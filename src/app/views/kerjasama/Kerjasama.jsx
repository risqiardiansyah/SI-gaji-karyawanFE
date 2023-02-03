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
import {
  getKerjasama,
  delKerjasama,
  downloadKerjasama,
} from 'app/redux/actions/KerjasamaAction';
import DetailKerjasama from './DetailKerjasama';

class Kerjasama extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      search: '',
      page: 0,
      rowsPerPage: 10,
      dataDetailKerjasama: {},
      modalDetail: false,
      openDetail: false,
      printPopUp: false,
      dataTermin: [],
      invoice_code: 0,
      excellent: false,

      dataLanguage: [
        {
          label: 'Indonesia',
          value: 'ind',
        },
        {
          label: 'English',
          value: 'eng',
        },
      ],
      bahasa: '',
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
    const { getKerjasama } = this.props;
    getKerjasama();
  }

  handleDelete = (id) => {
    const { delKerjasama, getKerjasama } = this.props;
    Swal.fire({
      title: 'Hapus',
      text: 'Apakah kamu yakin ?',
      showCancelButton: true,
      confirmButtonText: 'Yakin',
      cancelButtonText: 'Batal',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        delKerjasama(id)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: 'Berhasil',
                text: 'Data berhasil dihapus',
                timer: 2000,
                icon: 'success',
              });
              getKerjasama();
            }
          })
          .catch((err) => {
            console.log('err', err);
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
    history.push(`edit/kerjasama/${param}`);
  };

  handleViewPdf = (item, send_email) => {
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
    const { downloadKerjasama } = this.props;

    downloadKerjasama(item.perjanjian_code, send_email).then((res) => {
      window.open(res.data.pdf_path);
    });
  };

  handleModalDetail = (data) => {
    this.setState({
      modalDetail: true,
      dataEdit: data,
    });
  };

  handleClose = () => {
    this.setState({ modalDetail: false });
  };

  renderTable = () => {
    const { page, rowsPerPage, search, bahasa, dataLanguage } = this.state;
    const { dataKerjasama = [] } = this.props;
    return dataKerjasama?.length > 0 ? (
      dataKerjasama
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(
          (item) =>
            item.mitra_name?.toLowerCase().includes(search.toLowerCase()) ||
            item.signer_name?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell className="pl-2">{index + 1}</TableCell>
            <TableCell colSpan={2}>
              {!item.mitra_name ? 'Tidak di temukan' : item.mitra_name}
            </TableCell>
            <TableCell colSpan={2}>{item.signer_name}</TableCell>
            <TableCell colSpan={2}>{item.nama_proyek}</TableCell>
            <TableCell colSpan={2}>
              {item.bahasa === 'eng' ? 'English' : 'Indonesia'}
            </TableCell>
            <TableCell align="center" colSpan={3}>
              <ButtonGroup aria-label="group">
                <Button
                  onClick={() => this.handleEdit(item.perjanjian_code)}
                  variant="contained"
                  className="bg-primary text-white elevation-z0"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => this.handleViewPdf(item, 0)}
                  variant="contained"
                  className="bg-secondary text-white elevation-z0"
                >
                  View Pdf
                </Button>
                <Button
                  onClick={() => this.handleDelete(item.perjanjian_code)}
                  variant="contained"
                  className="bg-error text-white elevation-z0"
                >
                  Hapus
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))
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
    history.push('/tambah/kerjasama');
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      search,
      modalDetail,
      page,
      rowsPerPage,
      dataEdit,
      dataDetailKerjasama,
      printPopUp,
      dataTermin,
      invoice_code,
      excellent,
    } = this.state;

    const { dataKerjasama, match } = this.props;
    return (
      <div className="m-sm-30">
        <SimpleCard
          loading={false}
          title="Surat Perjanjian Kerjasama"
          subtitle="Data Surat Perjanjian Kerjasama"
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
                    Tambah Kerjasama
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
                    <TableCell className="pl-2">No.</TableCell>
                    <TableCell colSpan={2}>Nama Mitra</TableCell>
                    <TableCell colSpan={2}>Nama Signer</TableCell>

                    <TableCell colSpan={2}>Nama Proyek</TableCell>
                    <TableCell colSpan={2}>Bahasa</TableCell>
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
                count={dataKerjasama?.length ? dataKerjasama?.length : 0}
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

        {modalDetail && (
          <DetailKerjasama
            dataEdit={dataEdit}
            open={modalDetail}
            excellent={excellent}
            handleClose={this.handleClose}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataKerjasama: state.kerjasama.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getKerjasama: () => dispatch(getKerjasama()),
    delKerjasama: (params) => dispatch(delKerjasama(params)),
    downloadKerjasama: (perjanjian_code, email) =>
      dispatch(downloadKerjasama(perjanjian_code, email)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Kerjasama);
