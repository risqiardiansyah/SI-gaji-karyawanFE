export const navigations = [
  {
    name: "Daftar Signer",
    path: "/signer",
    icon: "people",
  },
  {
    name: "Daftar Mitra",
    path: "/mitra",
    icon: "people",
  },
  {
    name: "Daftar Karyawan",
    path: "/karyawan",
    icon: "people",
  },
  {
    name: "Office List",
    path: "/office",
    icon: "business",
  },
  {
    name: "Invoice",
    path: "/invoice",
    icon: "receipt",
  },
  {
    name: "Surat Menyurat",
    icon: "email",
    children: [
      {
        name: "Quotation",
        path: "/quotation",
        iconText: "Quotation",
      },
      {
        name: "Surat Kontrak",
        path: "/kontrak",
        iconText: "Surat Kontrak",
      },
      {
        name: "Surat Pernyataan Magang",
        path: "/super_magang",
        iconText: "SuPer Magang",
      },
      {
        name: "Surat Perjanjian Kerjasama",
        path: "/kerjasama",
        iconText: "Surat Perjanjian Kerjasama",
      },
      {
        name: "Surat Perjanjian Kerja",
        path: "/perjanjian_kontrak",
        iconText: "A",
      },
      {
        name: "Surat Keterangan Magang",
        path: "/suket_magang",
        iconText: "SuKet Magang",
      },
      {
        name: "Surat Keterangan Kerja",
        path: "/suket_kerja",
        iconText: "SuKet Kerja",
      },
      {
        name: "Surat Penerimaan Magang",
        path: "/magang/penerimaan",
        iconText: "Surat Penerimaan Magang",
      },
      {
        name: "Surat Penerimaan Kerja",
        path: "/kerja/penerimaan",
        iconText: "Surat Penerimaan Kerja",
      },
      {
        name: "Sertifikat",
        path: "/sertifikat",
        iconText: "Sertifikat",
      },
      {
        name: "Slip Gaji",
        path: "/slip_gaji",
        iconText: "Slip Gaji",
      },
      {
        name: "Surat Peringatan",
        path: "/surat_peringatan",
        iconText: "Surat Peringatan",
      },
      {
        name: "Surat Garansi",
        path: "/surat_garansi",
        iconText: "Surat Garansi",
      },
    ],
  },
  {
    name: "Form penilaian",
    icon: "assessment",
    children: [
      {
        name: "Kriteria Penilaian",
        path: "/kriteria/penilaian",
        iconText: "Kriteria Penilaian",
      },
      {
        name: "Penilaian",
        path: "/penilaian",
        iconText: "Penilaian",
      },
      {
        name: "Grafik",
        path: "/grafik/penilaian",
        iconText: "Grafik Penilaian",
      },
    ],
  },
  {
    name: "Form MOM",
    path: "/mom",
    icon: "groups",
  },
  {
    name: "Form Handover",
    path: "/handover",
    icon: "handshake",
  },
  {
    name: "Setting",
    icon: "settings",
    children: [
      {
        name: "Header & Footer",
        path: "/setting",
        iconText: "Head Foot",
      },
      {
        name: "Catatan Quotation",
        path: "/catatan_quotation",
        iconText: "Catatan Quotation",
      },
      {
        name: "Pasal MOU",
        path: "/pasal/perjanjian",
        iconText: "Pasal MOU",
      },
      {
        name: "Pasal Perjanjian Kerja",
        path: "/pasal/perjanjian_kontrak",
        iconText: "A",
      },
      {
        name: "Tunjangan",
        path: "/tunjangan",
        iconText: "A",
      },
      {
        name: "Divisi",
        path: "/divisi",
        iconText: "A",
      },
    ],
  },
];

export const navigations_bd = [
  {
    name: "Form MOM",
    path: "/mom",
    icon: "groups",
  },
  {
    name: "Form Handover",
    path: "/handover",
    icon: "handshake",
  },
];
