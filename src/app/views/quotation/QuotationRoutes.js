import AddQuotation from './AddQuotation';
import Quotation from './Quotation';
import EditQuotation from './EditQuotation';

const QuotationRoutes = [
  {
    path: '/quotation',
    component: Quotation,
  },
  {
    path: '/tambah/quotation',
    component: AddQuotation,
  },
  {
    path: '/edit/quotation/:id',
    component: EditQuotation,
  },
];

export default QuotationRoutes;
