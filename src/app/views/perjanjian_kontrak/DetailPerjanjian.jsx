import {
  Button,
  Dialog,
  Table,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core';

import { getKerjasama } from 'app/redux/actions/KerjasamaAction';
import { formatRupiah } from 'app/utils/globalFunction';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class DetailKerjasama extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      excellent: false,
    };
  }

  componentDidMount() {
    const { dataEdit } = this.props;
    this.setState({
      nama_mitra: dataEdit.mitra_name,
      nama_signer: dataEdit.signer_name,
      sub_total: dataEdit.biaya,
      ppn: dataEdit.total_ppn,
      total: dataEdit.total_biaya,
      metode_pembayaran: dataEdit.standart_pembayaran,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateTerm = (index, id, status) => {
    const { termin } = this.state;
    const { updateStatusTermin } = this.props;
    let newStatus = status == 0 ? 1 : 0;
    let newTermin = termin;
    let params = {
      idx_term: id,
      status: newStatus,
    };

    updateStatusTermin(params);

    newTermin[index]['status'] = newStatus;

    this.setState({
      termin: newTermin,
    });
  };

  printData = (id_inv, index, email) => {
    Swal.fire({
      title: 'Mohon Tunggu !',
      html: 'Mengambil Data..', // add html attribute if you want or remove
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 7000,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const { downloadInvoice } = this.props;
    const { excellent } = this.state;
    if (excellent) {
      downloadInvoice(id_inv, 'excellent', email).then((res) => {
        window.open(res.data.pdf_path);
      });
    } else {
      downloadInvoice(id_inv, index, email).then((res) => {
        window.open(res.data.pdf_path);
      });
    }
  };

  render() {
    const {
      nama_mitra,
      nama_signer,
      sub_total,
      ppn,
      total,
      metode_pembayaran,
    } = this.state;
    let { open, handleClose } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} maxWidth='sm' fullWidth={true}>
        <div className='p-5'>
          <h4 className='mb-5'>Detail Kerjasama</h4>
          <Table>
            <TableBody>
              <TableRow hover>
                <TableCell className='py-2 font-poppins font-bold pl-2'>
                  Nama Mitra
                </TableCell>
                <TableCell className='py-2 font-poppins pl-2'>
                  {nama_mitra}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell className='py-2 font-poppins font-bold pl-2'>
                  Nama Signer
                </TableCell>
                <TableCell className='py-2 font-poppins pl-2'>
                  {nama_signer}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell className='py-2 font-poppins font-bold pl-2'>
                  Sub Total
                </TableCell>
                <TableCell className='py-2 font-poppins pl-2'>
                  {formatRupiah(sub_total)}
                </TableCell>
              </TableRow>
              {!ppn === 0 && (
                <TableRow hover>
                  <TableCell className='py-2 font-poppins font-bold pl-2'>
                    PPN
                  </TableCell>
                  <TableCell className='py-2 font-poppins pl-2'>
                    {formatRupiah(ppn)}
                  </TableCell>
                </TableRow>
              )}
              <TableRow hover>
                <TableCell className='py-2 font-poppins font-bold pl-2'>
                  Total
                </TableCell>
                <TableCell className='py-2 font-poppins pl-2'>
                  {formatRupiah(total)}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell className='py-2 font-poppins font-bold pl-2'>
                  Metode Pembayaran
                </TableCell>
                <TableCell className='py-2 font-poppins pl-2'>
                  {metode_pembayaran}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className='w-full text-right pt-5'>
            <Button onClick={handleClose} variant='contained' color='default'>
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKerjasama: () => dispatch(getKerjasama()),
  };
};

export default connect(null, mapDispatchToProps)(DetailKerjasama);
