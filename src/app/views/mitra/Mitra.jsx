import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  InputAdornment,
  Table,
  TableCell,
  TableRow,
  TextField,
  TableBody,
  TableHead,
} from '@material-ui/core';
import { delMitra, getAllMitra } from 'app/redux/actions/MitraActions';
import { SimpleCard } from 'matx';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import AddMitra from './AddMitra';
import EditMitra from './EditMitra';

class Mitra extends Component {
  constructor() {
    super();
    this.state = {
      openAdd: false,
      type: '',
      modalEdit: false,
      dataEdit: {
        id: '',
        kategori: '',
        type: '',
      },
      search: '',
    };
  }

  componentDidMount() {
    const { getAllMitra } = this.props;
    getAllMitra();
  }

  handleModalEdit = (data) => {
    this.setState({
      modalEdit: true,
      dataEdit: data,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      modalEdit: false,
    });
  };

  handleDelete = (mitra_code) => {
    const { delMitra, getAllMitra } = this.props;
    Swal.fire({
      title: 'Hapus',
      text: 'Apakah kamu yakin',
      showCancelButton: true,
      confirmButtonText: 'Yakin',
      cancelButtonText: 'Batal',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        let params = {
          mitra_code: mitra_code,
        };
        delMitra(params)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: 'Berhasil',
                text: 'Data berhasil dihapus',
                timer: 2000,
                icon: 'success',
              });
              getAllMitra();
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

  renderTable = () => {
    const { search, page, rowsPerPage } = this.state;
    const { dataMitra } = this.props;
    return dataMitra?.length > 0 ? (
      dataMitra
        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(
          (item) =>
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.instansi?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.instansi}</TableCell>
            <TableCell align='center'>
              <ButtonGroup aria-label='group'>
                <Button
                  onClick={() => this.handleModalEdit(item)}
                  variant='contained'
                  className='bg-primary text-white elevation-z0'
                >
                  Edit
                </Button>
                <Button
                  onClick={() => this.handleDelete(item.mitra_code)}
                  variant='contained'
                  className='bg-error text-white elevation-z0'
                >
                  Hapus
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))
    ) : (
      <TableRow hover>
        <TableCell colSpan={6} align='center'>
          {' '}
          Data kosong{' '}
        </TableCell>
      </TableRow>
    );
  };

  handleEditKategori = (data, id) => {
    this.setState({
      modalEdit: true,
      dataEdit: {
        id: data.value,
        kategori: data.label,
        type: id,
      },
    });
  };

  handleCloseAdd = () => {
    const { getAllMitra } = this.props;
    this.setState({
      openAdd: false,
    });
    getAllMitra();
  };

  handleOpenAdd = (type) => {
    this.setState({
      type: type,
      openAdd: true,
    });
  };

  handleCloseEdit = () => {
    const { getAllMitra } = this.props;
    this.setState({
      modalEdit: false,
    });
    getAllMitra();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { openAdd, modalEdit, type, dataEdit, search } = this.state;
    return (
      <div className='m-sm-30'>
        <SimpleCard title='Data Mitra'>
          <Fragment>
            <Grid
              container
              spacing={2}
              justify='space-between'
              className='my-4'
            >
              <Grid item lg={5} md={5} sm={12} xs={12} className='mb-4'>
                <ButtonGroup aria-label='group'>
                  <Button
                    onClick={() => this.handleOpenAdd()}
                    variant='contained'
                    color='primary'
                    className='elevation-z0 font-medium'
                  >
                    Tambah Mitra
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <div className='flex items-center'>
                  <TextField
                    variant='standard'
                    className='w-full'
                    placeholder='Cari'
                    onChange={this.handleChange}
                    value={search}
                    name='search'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon>search</Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </Grid>
            </Grid>
            <div className='w-full overflow-auto bg-white'>
              <Table className='buku-kas-table'>
                <TableHead>
                  <TableRow>
                    <TableCell className='pl-2'>No</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>Instansi</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTable()}</TableBody>
              </Table>
            </div>
          </Fragment>
        </SimpleCard>
        {openAdd && (
          <AddMitra
            open={openAdd}
            type={type}
            handleClose={this.handleCloseAdd}
          />
        )}
        {modalEdit && (
          <EditMitra
            dataEdit={dataEdit}
            open={modalEdit}
            handleClose={this.handleCloseEdit}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataMitra: state.mitra.allData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMitra: () => dispatch(getAllMitra()),
    delMitra: (params) => dispatch(delMitra(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Mitra);
