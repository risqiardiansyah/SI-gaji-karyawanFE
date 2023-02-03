import Kontrak from "./Kontrak";
import TambahKontrak from "./TambahKontrak";
import EditKontrak from "./EditKontrak";

const SuratRoutes = [
  {
    path: "/kontrak/edit/:id",
    component: EditKontrak,
  },
  {
    path: "/kontrak",
    component: Kontrak,
  },
  {
    path: "/tambah/kontrak",
    component: TambahKontrak,
  },
];

export default SuratRoutes;
