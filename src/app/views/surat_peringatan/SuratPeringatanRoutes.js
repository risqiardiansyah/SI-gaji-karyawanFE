import SuratPeringatan from "./SuratPeringatan";
import TambahSuratPeringatan from "./TambahSuratPeringatan";
import EditSuratPeringatan from "./EditSuratPeringatan";

const SuratPeringatanRoutes = [
  {
    path: "/surat_peringatan/edit/:id",
    component: EditSuratPeringatan,
    exact: true,
  },
  {
    path: "/surat_peringatan",
    component: SuratPeringatan,
    exact: true,
  },
  {
    path: "/surat_peringatan/tambah",
    component: TambahSuratPeringatan,
    exact: true,
  },
];

export default SuratPeringatanRoutes;
