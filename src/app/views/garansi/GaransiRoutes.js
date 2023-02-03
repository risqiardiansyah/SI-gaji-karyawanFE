import Garansi from "./Garansi";
import TambahGaransi from "./TambahGaransi";
import EditGaransi from "./EditGaransi";

const GaransiRoutes = [
  {
    path: "/surat_garansi/edit/:id",
    component: EditGaransi,
    exact: false,
  },
  {
    path: "/surat_garansi",
    component: Garansi,
    exact: true,
  },
  {
    path: "/surat_garansi/tambah",
    component: TambahGaransi,
    exact: true,
  },
];

export default GaransiRoutes;
