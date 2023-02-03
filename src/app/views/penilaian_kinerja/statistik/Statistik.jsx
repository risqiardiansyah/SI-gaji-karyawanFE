import React, { Component } from "react";
import { connect } from "react-redux";

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { SimpleCard } from "matx";
import SimpleLineChart from "./SimpleLineChart";
import { getStatistikPenilaian } from "app/redux/actions/PenilaianActions";
import { getKaryawan } from "app/redux/actions/KaryawanActions";

class Statistik extends Component {
  constructor() {
    super();
    this.state = {
      type: "mingguan",
      karyawan_code: "",
      listTahun: [],
    };
  }

  componentDidMount() {
    this.getData();
    let now = new Date().getFullYear() + 1;
    for (let i = now - 5; i < now; i++) {
      this.state.listTahun.push(i);
    }
  }

  getData = () => {
    const { getStatistikPenilaian, getKaryawan } = this.props;
    getKaryawan(3, "active");
    getStatistikPenilaian(this.state);
  };

  getUserList = () => {
    const { getStatistikPenilaian } = this.props;
    getStatistikPenilaian(this.state);
  };

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.getUserList()
    );
  };

  handleChangeFilter = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.getUserList()
    );
  };

  render() {
    let { statistikPenilaian, dataKaryawan } = this.props;
    let { type, karyawan_code } = this.state;
    return (
      <div className="analytics m-sm-30 mt-30">
        <SimpleCard title="Grafik Penilaian Karyawan">
          <div className={"flex flex-end mb-5"}>
            <Grid item lg={3} md={3} sm={12} xs={12} style={{ marginRight: 5 }}>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Karyawan</InputLabel>
                <Select
                  value={karyawan_code}
                  onChange={this.handleChange}
                  name="karyawan_code"
                >
                  {dataKaryawan?.map((item, index) => (
                    <MenuItem
                      value={item.value}
                      selected={index == 0 ? "true" : "false"}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12} style={{ marginRight: 5 }}>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                  value={type}
                  onChange={this.handleChangeFilter}
                  name="type"
                >
                  <MenuItem value="x" disabled>
                    Pilih Filter
                  </MenuItem>
                  <MenuItem value="mingguan">Mingguan</MenuItem>
                  <MenuItem value="Bulanan">Bulanan</MenuItem>
                  <MenuItem value="6bulanan">6 Bulanan</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </div>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xs={12}>
              {statistikPenilaian?.length == 0 ? (
                <div
                  style={{
                    width: "100%",
                    height: "500px",
                    textAlign: "center",
                  }}
                >
                  <h6
                    style={{
                      width: "100%",
                      marginTop: "150px",
                    }}
                  >
                    Data belum tersedia <br />
                    {karyawan_code == ""
                      ? "Silahkan pilih karyawan terlebih dahulu"
                      : ""}
                  </h6>
                </div>
              ) : (
                <SimpleLineChart
                  listUser={dataKaryawan}
                  allData={statistikPenilaian}
                  karyawanCode={karyawan_code}
                />
              )}
            </Grid>
          </Grid>
        </SimpleCard>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  statistikPenilaian: state.penilaian.statistikPenilaian,
  dataKaryawan: state.karyawan.data,
});

export default connect(mapStateToProps, {
  getStatistikPenilaian,
  getKaryawan,
})(Statistik);
