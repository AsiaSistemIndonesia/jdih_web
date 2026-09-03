
import { z } from "zod";

export const DokumenHukumSchema = z.object({
  id: z.number().optional(),

  // ============================================================
  // JUDUL
  // ============================================================

  judul: z
    .string()
    .min(1, "Judul wajib diisi")
    .max(255, "Judul maksimal 255 karakter"),

  // ============================================================
  // KATEGORI
  // ============================================================

  kategori: z
    .string()
    .min(1, "Kategori wajib dipilih"),

  // ============================================================
  // NOMOR
  // ============================================================

  nomor: z
    .string()
    .min(1, "Nomor wajib diisi")
    .max(100, "Nomor maksimal 100 karakter"),

  // ============================================================
  // TAHUN
  // ============================================================

  tahun: z
    .coerce.number({
      message: "Tahun wajib diisi",
    }),

  bidang: z
    .string()
    .min(1, "Bidang wajib dipilih"),

  tipe_dokumen: z
    .string()
    .min(1, "Tipe dokumen wajib dipilih"),

  tempat_penetapan: z
    .string()
    .min(1, "Tempat penetapan wajib diisi"),

  tanggal_penetapan: z
    .string()
    .min(1, "Tanggal penetapan wajib diisi"),

  tanggal_pengundangan: z
    .string()
    .min(1, "Tanggal pengundangan wajib diisi"),

  tanggal_berlaku: z
    .string()
    .min(1, "Tanggal berlaku wajib diisi"),

  sumber: z
    .string()
    .min(1, "Sumber wajib diisi"),
  subject: z
    .string()
    .min(1, "Subject wajib dipilih"),

  status: z
    .string()
    .min(1, "Status wajib dipilih"),

file_abstrak: z
  .union([
    z.instanceof(File),
    z.string(),
    z.null(),
  ])
  .refine(
    (value) => {
      if (value === null) {
        return false;
      }

      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      return true;
    },
    {
      message: "File abstrak wajib diisi",
    }
  )
  .refine(
    (value) => {
      if (
        value === null ||
        typeof value === "string"
      ) {
        return true;
      }

      return value.size <= 30 * 1024 * 1024;
    },
    {
      message:
        "Ukuran file abstrak maksimal 30 MB",
    }
  )
  .refine(
    (value) => {
      if (
        value === null ||
        typeof value === "string"
      ) {
        return true;
      }

      return value.type === "application/pdf";
    },
    {
      message:
        "File abstrak harus berformat PDF",
    }
  ),

file_dokumen: z
  .union([
    z.instanceof(File),
    z.string(),
    z.null(),
  ])
  .refine(
    (value) => {
      // NULL = belum memilih file
      if (value === null) {
        return false;
      }

      // STRING = file lama dari database
      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      // FILE = file baru
      return true;
    },
    {
      message: "File dokumen wajib diisi",
    }
  )
  .refine(
    (value) => {
      // Null dan file lama tidak perlu validasi ukuran
      if (
        value === null ||
        typeof value === "string"
      ) {
        return true;
      }

      return value.size <= 30 * 1024 * 1024;
    },
    {
      message:
        "Ukuran file dokumen maksimal 30 MB",
    }
  )
  .refine(
    (value) => {
      // Null dan file lama tidak perlu validasi tipe
      if (
        value === null ||
        typeof value === "string"
      ) {
        return true;
      }

      return value.type === "application/pdf";
    },
    {
      message:
        "File dokumen harus berformat PDF",
    }
  ),

});

export type DokumenHukumFormValues =
  z.infer<typeof DokumenHukumSchema>;
