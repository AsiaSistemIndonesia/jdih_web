export const APP_BASE_URL =
  process.env.NEXT_PUBLIC_APP_BASE_URL ?? "http://localhost:3000";

export const DOKUMEN_ENDPOINT = "/dokumen";
export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
export const KATEGORI_BERITA = [
  {
    value: "Berita Terkini",
    label: "Berita Terkini",
  },
  {
    value: "Kegiatan",
    label: "Kegiatan",
  },
  {
    value: "Agenda",
    label: "Agenda",
  },
  {
    value: "Informasi",
    label: "Informasi",
  },
  {
    value: "Sosialisasi",
    label: "Sosialisasi",
  },
  {
    value: "Prestasi",
    label: "Prestasi",
  },
  {
    value: "Pengumuman",
    label: "Pengumuman",
  },
];

export const kategoriOptions = [
    {
      value: "",
      label: "Pilih kategori",
    },
    {
      value: "Peraturan",
      label: "Peraturan",
    },
    {
      value: "Keputusan",
      label: "Keputusan",
    },
    {
      value: "Instruksi",
      label: "Instruksi",
    },
    {
      value: "Perundang-Undangan",
      label: "Perundang-Undangan",
    },
  ];

  
    export const tipeDokumenOptions = [
      {
        value: "",
        label: "Pilih tipe dokumen",
      },
      {
        value: "peraturan-perundang-undangan",
        label: "Peraturan Perundang-undangan",
      },
      {
        value: "peraturan-pemerintah",
        label: "Peraturan Pemerintah",
      },
      {
        value: "peraturan-menteri",
        label: "Peraturan Menteri",
      },
      {
        value: "peraturan-daerah",
        label: "Peraturan Daerah",
      },
    ];
  
    export const bidangOptions = [
      {
        value: "",
        label: "Pilih bidang",
      },
      {
        value: "hukum-administrasi-negara",
        label: "Hukum Administrasi Negara",
      },
      {
        value: "hukum-pidana",
        label: "Hukum Pidana",
      },
      {
        value: "hukum-perdata",
        label: "Hukum Perdata",
      },
      {
        value: "hukum-tata-negara",
        label: "Hukum Tata Negara",
      },
    ];
  
    export const subjectOptions = [
      {
        value: "",
        label: "Pilih subject",
      },
      {
        value: "kode-etik-badan-pemeriksa-keuangan",
        label: "Kode Etik Badan Pemeriksa Keuangan",
      },
      {
        value: "pemeriksaan-keuangan-negara",
        label: "Pemeriksaan Keuangan Negara",
      },
      {
        value: "administrasi-negara",
        label: "Administrasi Negara",
      },
    ];
  
    export const statusOptions = [
      {
        value: "",
        label: "Pilih status",
      },
      {
        value: "Berlaku",
        label: "Berlaku",
      },
      {
        value: "Tidak Berlaku",
        label: "Tidak Berlaku",
      },
    ];