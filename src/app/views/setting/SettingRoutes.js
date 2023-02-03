import AddHeader from "./AddHeader";
import EditHeader from "./EditHeader";
import Header from "./Header";
import SettingPerjanjian from "./perjanjian/SettingPerjanjian";
import SettingPerjanjianKontrak from "./perjanjian_kontrak/SettingPerjanjianKontrak";
import CatatanQuotation from "./quotation/CatatanQuotation";

const SettingRoutes = [
  {
    path: "/setting",
    component: Header,
    exact: true,
  },
  {
    path: "/header/add",
    component: AddHeader,
    exact: true,
  },
  {
    path: "/header/edit/:id",
    component: EditHeader,
    exact: true,
  },
  {
    path: "/catatan_quotation",
    component: CatatanQuotation,
  },
  {
    path: "/pasal/perjanjian",
    component: SettingPerjanjian,
  },
  {
    path: "/pasal/perjanjian_kontrak",
    component: SettingPerjanjianKontrak,
  },
];

export default SettingRoutes;
