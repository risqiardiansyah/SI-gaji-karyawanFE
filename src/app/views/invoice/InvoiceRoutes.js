import Invoice from "./Invoice";
import TambahInvoice from "./TambahInvoice";
import EditInvoice from "./EditInvoice";
import LogPrint from "../Log/LogPrint";

const InvoiceRoutes = [
  {
    path: "/invoice/edit/:id",
    component: EditInvoice,
  },
  {
    path: "/invoice",
    component: Invoice,
  },
  {
    path: "/tambah/invoice",
    component: TambahInvoice,
  },
  {
    path: "/print/log/:type/:code/:termin",
    component: LogPrint,
  },
];

export default InvoiceRoutes;
