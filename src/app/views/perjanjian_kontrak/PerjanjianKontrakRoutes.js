import PerjanjianKontrak from "./PerjanjianKontrak";
import EditPerjanjian from "./EditPerjanjian";
import TambahPerjanjian from "./TambahPerjanjian";

const PerjanjianKontrakRoutes = [
  {
    path: "/perjanjian_kontrak/:id/edit",
    exact: true,
    component: EditPerjanjian,
  },
  {
    path: "/perjanjian_kontrak/tambah",
    exact: true,
    component: TambahPerjanjian,
  },
  {
    path: "/perjanjian_kontrak",
    exact: false,
    component: PerjanjianKontrak,
  },
];

export default PerjanjianKontrakRoutes;
