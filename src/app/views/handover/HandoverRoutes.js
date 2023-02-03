import Handover from "./Handover";
import TambahHandover from "./TambahHandover";
import EditHandover from "./EditHandover";

const HandoverRoutes = [
  {
    path: "/handover/edit/:ho_code",
    component: EditHandover,
    exact: false,
  },
  {
    path: "/handover",
    component: Handover,
    exact: true,
  },
  {
    path: "/handover/tambah",
    component: TambahHandover,
    exact: false,
  },
];

export default HandoverRoutes;
