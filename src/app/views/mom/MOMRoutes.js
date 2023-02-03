import MOM from "./MOM";
import TambahMOM from "./TambahMOM";
import EditMom from "./EditMom";

const MOMRoutes = [
  {
    path: "/mom/edit/:mom_code",
    component: EditMom,
    exact: false,
  },
  {
    path: "/mom",
    component: MOM,
    exact: true,
  },
  {
    path: "/mom/tambah",
    component: TambahMOM,
    exact: false,
  },
];

export default MOMRoutes;
