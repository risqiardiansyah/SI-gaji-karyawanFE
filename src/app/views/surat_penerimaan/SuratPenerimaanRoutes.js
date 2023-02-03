import EditSuratPenerimaanKerja from "./kerja/EditSuratPenerimaanKerja";
import SuratPenerimaanKerja from "./kerja/SuratPenerimaanKerja";
import TambahSuratPenerimaanKerja from "./kerja/TambahSuratPenerimaanKerja";
import EditSuratPenerimaan from "./magang/EditSuratPenerimaan";
import SuratPenerimaan from "./magang/SuratPenerimaan";
import TambahSuratPenerimaan from "./magang/TambahSuratPenerimaan";

const SuratPenerimaanRoutes = [
  {
    path: "/magang/penerimaan",
    component: SuratPenerimaan,
  },
  {
    path: "/tambah/magang/penerimaan",
    component: TambahSuratPenerimaan,
  },
  {
    path: "/edit/magang/penerimaan/:id",
    component: EditSuratPenerimaan,
  },
  {
    path: "/kerja/penerimaan",
    component: SuratPenerimaanKerja,
  },
  {
    path: "/tambah/kerja/penerimaan",
    component: TambahSuratPenerimaanKerja,
  },
  {
    path: "/edit/kerja/penerimaan/:id",
    component: EditSuratPenerimaanKerja,
  },
];

export default SuratPenerimaanRoutes;
