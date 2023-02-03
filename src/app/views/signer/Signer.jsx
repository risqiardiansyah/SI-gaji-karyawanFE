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
import { delSigner, getAllSigner } from 'app/redux/actions/SignerActions';
import { SimpleCard } from 'matx';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import AddSigner from './AddSigner';
import EditSigner from './EditSigner';

class Signer extends Component {
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
    const { getAllSigner } = this.props;
    getAllSigner();
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

  handleDelete = (id) => {
    const { delSigner, getAllSigner } = this.props;
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
          signer_code: id,
        };
        delSigner(params)
          .then((res) => {
            if (res.code === 0) {
              Swal.fire({
                title: 'Berhasil',
                text: 'Data berhasil dihapus',
                timer: 2000,
                icon: 'success',
              });
              getAllSigner();
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
    const { dataSigner } = this.props;
    return dataSigner?.length > 0 ? (
      dataSigner
        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(
          (item) =>
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.position?.toLowerCase().includes(search.toLowerCase()) ||
            item.instansi?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index) => (
          <TableRow hover key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.instansi}</TableCell>
            <TableCell>{item.position}</TableCell>
            <TableCell>{item.address}</TableCell>
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
                  onClick={() => this.handleDelete(item.signer_code)}
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
    const { getAllSigner } = this.props;
    this.setState({
      openAdd: false,
    });
    getAllSigner();
  };

  handleOpenAdd = (type) => {
    this.setState({
      type: type,
      openAdd: true,
    });
  };

  handleCloseEdit = () => {
    const { getAllSigner } = this.props;
    this.setState({
      modalEdit: false,
    });
    getAllSigner();
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
        <SimpleCard title='Data Signer'>
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
                    Tambah Signer
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
                    <TableCell>Instansi</TableCell>
                    <TableCell>Posisi</TableCell>
                    <TableCell>Alamat</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTable()}</TableBody>
              </Table>
            </div>
          </Fragment>
        </SimpleCard>
        {openAdd && (
          <AddSigner
            open={openAdd}
            type={type}
            handleClose={this.handleCloseAdd}
          />
        )}
        {modalEdit && (
          <EditSigner
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
    dataSigner: state.signer.allData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSigner: () => dispatch(getAllSigner()),
    delSigner: (params) => dispatch(delSigner(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signer);
