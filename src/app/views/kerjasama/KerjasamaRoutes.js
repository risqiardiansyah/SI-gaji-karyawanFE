import Kerjasama from './Kerjasama';
import EditKerjasama from './EditKerjasama';
import TambahKerjasama from './TambahKerjasama';

const KerjasamaRoutes = [
  {
    path: '/edit/kerjasama/:id',
    component: EditKerjasama,
  },
  {
    path: '/kerjasama',
    component: Kerjasama,
  },
  {
    path: '/tambah/kerjasama',
    component: TambahKerjasama,
  },
];

export default KerjasamaRoutes;
