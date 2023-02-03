import {
  Button,
  Dialog,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Chip,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { editKaryawan } from "app/redux/actions/KaryawanActions";
import { formatRupiah } from "app/utils/globalFunction";

class DetailKaryawan extends Component {
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
      v_tanggal_lahir: new Date(),
      hak_cuti: 0,
    };
  }

  componentDidMount() {
    const { dataEdit } = this.props;
    // const { dataType } = this.state;

    this.setState({
      karyawan_code: dataEdit.karyawan_code,
      nama: dataEdit.nama,
      alamat: dataEdit.alamat,
      tempat_lahir: dataEdit.tempat_lahir,
      v_tanggal_lahir: dataEdit.tanggal_lahir_text,
      tanggal_lahir: dataEdit.tanggal_lahir,
      email: dataEdit.email,
      nik: dataEdit.nik,
      telp: dataEdit.telp,
      asal_kampus: dataEdit.asal_kampus,
      status: dataEdit.status,
      typeSelected: dataEdit.type,
      foto_ktp: dataEdit.foto_ktp,
      foto_profile: dataEdit.foto_profile,
      foto_npwp: dataEdit.foto_npwp,
      foto_bpjs: dataEdit.foto_bpjs,
      no_bpjs: dataEdit.no_bpjs,
      no_npwp: dataEdit.no_npwp,
      gaji_pokok: dataEdit.gaji_pokok,
      tunjangan: dataEdit.tunjangan,
      posisi: dataEdit.posisi,
      aktif_bekerja: dataEdit.aktif_bekerja,
      hak_cuti: dataEdit.hak_cuti,
      jenis_kelamin: dataEdit.jenis_kelamin,
    });
  }

  render() {
    let {
      nama,
      alamat,
      tempat_lahir,
      v_tanggal_lahir,
      email,
      nik,
      telp,
      asal_kampus,
      status,
      typeSelected,
      foto_ktp,
      foto_profile,
      no_bpjs,
      no_npwp,
      gaji_pokok,
      tunjangan,
      posisi,
      aktif_bekerja,
      hak_cuti,
      jenis_kelamin,
      foto_npwp,
      foto_bpjs,
    } = this.state;
    let { open, handleClose } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
        <div className="p-5">
          <h4 className="mb-5">Detail Karyawan</h4>
          <Table>
            <TableBody>
              <TableRow hover>
                <TableCell>Jenis Pekerja</TableCell>
                <TableCell>
                  {typeSelected === 1 ? "KARYAWAN" : "MAGANG"}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Nama</TableCell>
                <TableCell>{nama}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Jenis Kelamin</TableCell>
                <TableCell>
                  {jenis_kelamin == 1 ? "Laki-laki" : "Perempuan"}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Alamat Lengkap</TableCell>
                <TableCell>{alamat}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Tempat &amp; Tanggal Lahir</TableCell>
                <TableCell>
                  {tempat_lahir}, {v_tanggal_lahir}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Email</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>No. Telp</TableCell>
                <TableCell>{telp}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>NIK</TableCell>
                <TableCell>{nik}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>No. BPJS</TableCell>
                <TableCell>{no_bpjs}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>No. NPWP</TableCell>
                <TableCell>{no_npwp}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Posisi</TableCell>
                <TableCell>{posisi}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Gaji Pokok</TableCell>
                <TableCell>{formatRupiah(gaji_pokok)}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Tunjangan</TableCell>
                <TableCell>{formatRupiah(tunjangan)}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Aktif Bekerja</TableCell>
                <TableCell>
                  <Chip
                    label={aktif_bekerja == 1 ? "Ya" : "Tidak"}
                    size="small"
                    color={aktif_bekerja == 0 ? "error" : "primary"}
                  />
                </TableCell>
              </TableRow>
              {typeSelected === 1 ? (
                <>
                  <TableRow hover>
                    <TableCell>Status</TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>Hak Cuti Tahunan</TableCell>
                    <TableCell>{hak_cuti}</TableCell>
                  </TableRow>
                </>
              ) : (
                ""
              )}
              {typeSelected === 2 ? (
                <TableRow hover>
                  <TableCell>Asal Kampus</TableCell>
                  <TableCell>{asal_kampus}</TableCell>
                </TableRow>
              ) : (
                ""
              )}
              <TableRow hover>
                <TableCell style={{ verticalAlign: "top" }}>
                  Foto Profile
                  <a
                    href={
                      foto_ktp ||
                      "https://api.finance.alan.co.id/storage/img/default.png"
                    }
                    target="blank"
                    download
                  >
                    <img
                      src={
                        foto_profile ||
                        "https://api.finance.alan.co.id/storage/img/default.png"
                      }
                      alt=""
                    />
                  </a>
                </TableCell>
                <TableCell style={{ verticalAlign: "top" }}>
                  Foto KTP
                  <a
                    href={
                      foto_ktp ||
                      "https://api.finance.alan.co.id/storage/img/default.png"
                    }
                    target="blank"
                    download
                  >
                    <img
                      src={
                        foto_ktp ||
                        "https://api.finance.alan.co.id/storage/img/default.png"
                      }
                      alt=""
                    />
                  </a>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell style={{ verticalAlign: "top" }}>
                  Foto NPWP
                  <a href={foto_npwp} target="blank" download>
                    <img
                      src={
                        foto_npwp ||
                        "https://api.finance.alan.co.id/storage/img/default.png"
                      }
                      alt=""
                    />
                  </a>
                </TableCell>
                <TableCell style={{ verticalAlign: "top" }}>
                  Foto BPJS
                  <a
                    href={
                      foto_ktp ||
                      "https://api.finance.alan.co.id/storage/img/default.png"
                    }
                    target="blank"
                    download
                  >
                    <img
                      src={
                        foto_bpjs ||
                        "https://api.finance.alan.co.id/storage/img/default.png"
                      }
                      alt=""
                    />
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="w-full text-right">
            <Button onClick={handleClose} variant="contained" color="default">
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
    editKaryawan: (params, id) => dispatch(editKaryawan(params, id)),
  };
};

export default connect(null, mapDispatchToProps)(DetailKaryawan);
