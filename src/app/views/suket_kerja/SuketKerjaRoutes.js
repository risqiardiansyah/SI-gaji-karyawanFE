import SuketKerja from './SuketKerja';
import TambahSuketKerja from './TambahSuketKerja';
import EditSuketKerja from './EditSuketKerja';

const SuketKerjaRoutes = [
  {
    path: '/edit/suket_kerja/:id',
    component: EditSuketKerja,
  },
  {
    path: '/suket_kerja',
    component: SuketKerja,
  },
  {
    path: '/tambah/suket_kerja',
    component: TambahSuketKerja,
  },
];

export default SuketKerjaRoutes;
