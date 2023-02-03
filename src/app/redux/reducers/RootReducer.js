import { combineReducers } from "redux";

import CheckTokenReducer from "./CheckTokenReducer";
import DashboardReducer from "./DashboardReducer";
import EcommerceReducer from "./EcommerceReducer";
import InvoiceReducer from "./InvoiceReducer";
import LayoutReducer from "./LayoutReducer";
import LoginReducer from "./LoginReducer";
import NavigationReducer from "./NavigationReducer";
import NotificationReducer from "./NotificationReducer";
import SignerReducer from "./SignerReducer";
import MitraReducer from "./MitraReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import UserReducer from "./UserReducer";
import KaryawanReducer from "./KaryawanReducer";
import QuotationReducer from "./QuotationReducer";
import KontrakReducer from "./KontrakReducer";
import SuperReducer from "./SuperReducer";
import SuketReducer from "./SuketReducer";
import PenerimaanReducer from "./PenerimaanReducer";
import KerjasamaReducer from "./KerjasamaReducer";
import WebSettingReducer from "./WebSettingReducer";
import PerjanjianReducer from "./PerjanjianReducer";
import PelangganReducer from "./PelangganReducer";
import PeringatanReducer from "./PeringatanReducer";
import PenilaianReducer from "./PenilaianReducer";
import MOMReducer from "./MOMReducer";
import HandoverReducer from "./HandoverReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notifications: NotificationReducer,
  ecommerce: EcommerceReducer,
  navigations: NavigationReducer,
  signer: SignerReducer,
  invoice: InvoiceReducer,
  dashboard: DashboardReducer,
  checkToken: CheckTokenReducer,
  mitra: MitraReducer,
  karyawan: KaryawanReducer,
  quotation: QuotationReducer,
  kontrak: KontrakReducer,
  super: SuperReducer,
  suket: SuketReducer,
  setting: WebSettingReducer,
  penerimaan: PenerimaanReducer,
  kerjasama: KerjasamaReducer,
  perjanjian: PerjanjianReducer,
  pelanggan: PelangganReducer,
  peringatan: PeringatanReducer,
  penilaian: PenilaianReducer,
  mom: MOMReducer,
  handover: HandoverReducer,
});

export default RootReducer;
