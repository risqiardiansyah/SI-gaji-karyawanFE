import SlipGaji from "./SlipGaji";
import TambahSlipGaji from "./TambahSlipGaji";
import EditSlipGaji from "./EditSlipGaji";

const SlipGajiRoutes = [
  {
    path: "/slip_gaji/edit/:id/:karyawan_code",
    component: EditSlipGaji,
    exact: false,
  },
  {
    path: "/slip_gaji",
    component: SlipGaji,
    exact: true,
  },
  {
    path: "/slip_gaji/tambah",
    component: TambahSlipGaji,
    exact: false,
  },
];

export default SlipGajiRoutes;
