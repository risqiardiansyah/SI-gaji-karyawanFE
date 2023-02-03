import Sertifikat from "./Sertifikat";
import TambahSertifikat from "./TambahSertifikat";
import EditSertifikat from "./EditSertifikat";

const SertifikatRoutes = [
  {
    path: "/sertifikat/edit/:id",
    component: EditSertifikat,
    exact: false,
  },
  {
    path: "/sertifikat",
    component: Sertifikat,
    exact: true,
  },
  {
    path: "/sertifikat/tambah",
    component: TambahSertifikat,
    exact: false,
  },
];

export default SertifikatRoutes;
