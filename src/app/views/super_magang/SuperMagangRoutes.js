import SuperMagang from "./SuperMagang";
import TambahSuperMagang from "./TambahSuperMagang";
import EditKontrak from "./EditKontrak";

const SuperMagangRoutes = [
  {
    path: "/kontrak/edit/:id",
    component: EditKontrak,
  },
  {
    path: "/super_magang",
    component: SuperMagang,
  },
  {
    path: "/tambah/super_magang",
    component: TambahSuperMagang,
  },
];

export default SuperMagangRoutes;
