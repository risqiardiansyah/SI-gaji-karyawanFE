import React from "react";
import { Redirect } from "react-router-dom";

import akunRoutes from "./views/akun/akunRoutes";
import InvoiceRoutes from "./views/invoice/InvoiceRoutes";
import SignerRoutes from "./views/signer/SignerRoutes";
import MitraRoutes from "./views/mitra/MitraRoutes";
import KaryawanRoutes from "./views/karyawan/KaryawanRoutes";
import QuotationRoutes from "./views/quotation/QuotationRoutes";
import KontrakRoutes from "./views/kontrak/KontrakRoutes";
import SuperMagang from "./views/super_magang/SuperMagangRoutes";
import KerjasamaRoutes from "./views/kerjasama/KerjasamaRoutes";
import SettingRoutes from "./views/setting/SettingRoutes";
import SuketMagangRoutes from "./views/suket_magang/SuketMagangRoutes";
import SuketKerjaRoutes from "./views/suket_kerja/SuketKerjaRoutes";
import SuratPenerimaanRoutes from "./views/surat_penerimaan/SuratPenerimaanRoutes";
import OfficeRoutes from "./views/office/OfficeRoutes";
import PerjanjianKontrakRoutes from "./views/perjanjian_kontrak/PerjanjianKontrakRoutes";
import SertifikatRoutes from "./views/sertifikat/SertifikatRoutes";
import TunjanganRoutes from "./views/tunjangan/TunjanganRoutes";
import SlipGajiRoutes from "./views/slip_gaji/SlipRoutes";
import SuratPeringatanRoutes from "./views/surat_peringatan/SuratPeringatanRoutes";
import PenilaianRoutes from "./views/penilaian_kinerja/PenilaianRoutes";
import MOMRoutes from "./views/mom/MOMRoutes";
import HandoverRoutes from "./views/handover/HandoverRoutes";
import GaransiRoutes from "./views/garansi/GaransiRoutes";
import DivisiRoutes from "./views/setting/divisi/DivisiRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/mom" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [
  ...InvoiceRoutes,
  ...SignerRoutes,
  ...akunRoutes,
  ...MitraRoutes,
  ...KaryawanRoutes,
  ...QuotationRoutes,
  ...KontrakRoutes,
  ...SuperMagang,
  ...KerjasamaRoutes,
  ...SuketMagangRoutes,
  ...SuketKerjaRoutes,
  ...SettingRoutes,
  ...OfficeRoutes,
  ...PerjanjianKontrakRoutes,
  ...SuratPenerimaanRoutes,
  ...SertifikatRoutes,
  ...SlipGajiRoutes,
  ...TunjanganRoutes,
  ...PenilaianRoutes,
  ...MOMRoutes,
  ...SuratPeringatanRoutes,
  ...HandoverRoutes,
  ...GaransiRoutes,
  ...DivisiRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;
