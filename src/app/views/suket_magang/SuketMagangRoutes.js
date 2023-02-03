import SuketMagang from './SuketMagang';
import TambahSuketMagang from './TambahSuketMagang';
import EditSuketMagang from './EditSuketMagang';

const SuketMagangRoutes = [
  {
    path: '/edit/suket_magang/:id',
    component: EditSuketMagang,
  },
  {
    path: '/suket_magang',
    component: SuketMagang,
  },
  {
    path: '/tambah/suket_magang',
    component: TambahSuketMagang,
  },
];

export default SuketMagangRoutes;
