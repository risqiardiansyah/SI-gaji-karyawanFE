import Penilaian from "./Penilaian";
import TambahPenilaian from "./TambahPenilaian";
import EditPenilaian from "./EditPenilaian";
import KriteriaPenilaian from "./kriteria/KriteriaPenilaian";
import Statistik from "./statistik/Statistik";

const PenilaianRoutes = [
  {
    path: "/penilaian/edit/:penilaian_code",
    component: EditPenilaian,
    exact: false,
  },
  {
    path: "/penilaian",
    component: Penilaian,
    exact: true,
  },
  {
    path: "/penilaian/tambah",
    component: TambahPenilaian,
    exact: false,
  },
  {
    path: "/penilaian/grafik",
    component: TambahPenilaian,
    exact: false,
  },
  {
    path: "/kriteria/penilaian",
    component: KriteriaPenilaian,
    exact: true,
  },
  {
    path: "/grafik/penilaian",
    component: Statistik,
    exact: true,
  },
];

export default PenilaianRoutes;
