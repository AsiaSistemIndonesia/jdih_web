export const APP_BASE_URL =
  process.env.NEXT_PUBLIC_APP_BASE_URL ?? "https://jdih-be.asiasistem.com";

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
  {
    value: "Monografi Hukum",
    label: "Monografi Hukum",
  },
  {
    value: "Artikel Hukum",
    label: "Artikel Hukum",
  },
  {
    value: "Putusan Pengadilan",
    label: "Putusan Pengadilan",
  },
  {
    value: "Dokumen Langka",
    label: "Dokumen Langka",
  },
  {
    value: "Uji Publik Rancangan",
    label: "Uji Publik Rancangan",
  },
  {
    value: "Program Penyusunan PUU",
    label: "Program Penyusunan PUU",
  },
];

export const tipeDokumenOptions = [
  {
    label: "Peraturan Daerah",
    value: "Peraturan Daerah",
  },
  {
    label: "Peraturan Kepala Daerah",
    value: "Peraturan Kepala Daerah",
  },
  {
    label: "Peraturan Desa",
    value: "Peraturan Desa",
  },
  {
    label: "Keputusan Kepala Daerah",
    value: "Keputusan Kepala Daerah",
  },
  {
    label: "Keputusan Kepala Perangkat Daerah",
    value: "Keputusan Kepala Perangkat Daerah",
  },
  {
    label: "Instruksi Kepala Daerah",
    value: "Instruksi Kepala Daerah",
  },
  {
    label: "Surat Edaran",
    value: "Surat Edaran",
  },
  {
    label: "Rancangan Peraturan Daerah",
    value: "Rancangan Peraturan Daerah",
  },
  {
    label: "Naskah Akademik",
    value: "Naskah Akademik",
  },
  {
    label: "Putusan Pengadilan",
    value: "Putusan Pengadilan",
  },
  {
    label: "Yurisprudensi",
    value: "Yurisprudensi",
  },
  {
    label: "Perjanjian / Kerja Sama",
    value: "Perjanjian / Kerja Sama",
  },
  {
    label: "Monografi Hukum",
    value: "Monografi Hukum",
  },
  {
    label: "Artikel / Jurnal Hukum",
    value: "Artikel / Jurnal Hukum",
  },
  {
    label: "Dokumen Hukum Internasional",
    value: "Dokumen Hukum Internasional",
  },
  {
    label: "Dokumen Hukum Lainnya",
    value: "Dokumen Hukum Lainnya",
  },
];
export const bidangOptions = [
  {
    value: "",
    label: "Pilih bidang",
  },
  {
    value: "Hukum Umum",
    label: "Hukum Umum",
  },
  {
    value: "Hukum Adat",
    label: "Hukum Adat",
  },
  {
    value: "Hukum Administrasi Negara",
    label: "Hukum Administrasi Negara",
  },
  {
    value: "Hukum Agraria",
    label: "Hukum Agraria",
  },
  {
    value: "Hukum Dagang",
    label: "Hukum Dagang",
  },
  {
    value: "Hukum Islam",
    label: "Hukum Islam",
  },
  {
    value: "Hukum Internasional",
    label: "Hukum Internasional",
  },
  {
    value: "Hukum Lingkungan",
    label: "Hukum Lingkungan",
  },
  {
    value: "Hukum Perburuhan",
    label: "Hukum Perburuhan",
  },
  {
    value: "Hukum Perdata",
    label: "Hukum Perdata",
  },
  {
    value: "Hukum Pidana",
    label: "Hukum Pidana",
  },
  {
    value: "Hukum Tata Negara",
    label: "Hukum Tata Negara",
  },
  {
    value: "Himpunan Peraturan",
    label: "Himpunan Peraturan",
  },
  {
    value: "Putusan Pengadilan",
    label: "Putusan Pengadilan",
  },
  {
    value: "Referensi",
    label: "Referensi",
  },
  {
    value: "Hukum Acara Pidana",
    label: "Hukum Acara Pidana",
  },
];

export const subjectOptions = [
  {
    value: "",
    label: "Pilih subject",
  },
  {
    value: "Kode Etik Badan Pemeriksa Keuangan",
    label: "Kode Etik Badan Pemeriksa Keuangan",
  },
  {
    value: "Pemeriksaan Keuangan Negara",
    label: "Pemeriksaan Keuangan Negara",
  },
  {
    value: "Administrasi Negara",
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

export const getTahunOptions = () => {
  const options = [
    {
      value: "",
      label: "Pilih tahun",
    },
  ];

  for (let tahun = 2026; tahun >= 1970; tahun--) {
    const tahunStr = tahun.toString();
    options.push({
      value: tahunStr,
      label: tahunStr,
    });
  }

  return options;
};

export const tahunOptions = getTahunOptions();