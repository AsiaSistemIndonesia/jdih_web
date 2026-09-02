const fs = require("fs");
const path = require("path");

const beritaRepository =
    require("../repositories/berita.repository");


/**
 * ==========================================
 * HAPUS GAMBAR
 * ==========================================
 */
const deleteImage = (filename) => {

    if (!filename) {
        return;
    }

    const filePath = path.join(
        process.cwd(),
        "uploads",
        "berita",
        filename
    );

    try {

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

    } catch (error) {

        console.error(
            "Gagal menghapus gambar:",
            error
        );
    }
};


/**
 * ==========================================
 * GET ALL
 * SEARCH + PAGINATION
 * ==========================================
 */
const getAll = async ({
    search = "",
    page = 1,
    size = 10,
} = {}) => {

    // ==========================================
    // KONVERSI PAGE
    // ==========================================

    page = Number(page);

    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        page = 1;
    }


    // ==========================================
    // KONVERSI SIZE
    // ==========================================

    size = Number(size);

    if (
        !Number.isInteger(size) ||
        size < 1
    ) {
        size = 10;
    }


    // ==========================================
    // BATAS MAKSIMAL SIZE
    // ==========================================

    if (size > 100) {
        size = 100;
    }


    // ==========================================
    // SEARCH
    // ==========================================

    search = String(
        search || ""
    ).trim();


    // ==========================================
    // REPOSITORY
    // ==========================================

    const result =
        await beritaRepository.findAll({
            search,
            page,
            size,
        });


    // ==========================================
    // TOTAL DATA
    // ==========================================

    const total = result.total;


    // ==========================================
    // TOTAL PAGE
    // ==========================================

    const totalPages =
        total > 0
            ? Math.ceil(total / size)
            : 0;


    // ==========================================
    // RETURN
    // ==========================================
const backendUrl =
    process.env.APP_BACKEND_URL ||
    "https://jdih-be.asiasistem.com";

const imageBaseUrl =
    `${backendUrl.replace(/\/$/, "")}/uploads/berita`;

const formatBerita = (item) => {

    if (!item) {
        return item;
    }

    return {
        ...item,
        gambar: item.gambar
            ? `${imageBaseUrl}/${item.gambar}`
            : null,
    };
};
    return {

        data : result.data.map(formatBerita),

        pagination: {

            page,

            size,

            total,

            totalPages,

            hasNext:
                page < totalPages,

            hasPrevious:
                page > 1 &&
                totalPages > 0,
        },
    };
};


/**
 * ==========================================
 * GET BY ID
 * ==========================================
 */
const getById = async (id) => {

    return await beritaRepository.findById(id);

};


/**
 * ==========================================
 * CREATE
 * ==========================================
 */
const create = async (data) => {

    return await beritaRepository.create({

        judul:
            data.judul,

        kategori:
            data.kategori,

        tanggal_berita:
            data.tanggal_berita,

        penulis:
            data.penulis,

        gambar:
            data.gambar,

        isi_berita:
            data.isi_berita,

        status:
            data.status,
    });

};


/**
 * ==========================================
 * UPDATE
 * ==========================================
 */
const update = async (id, data) => {
  const oldBerita = await beritaRepository.findById(id);

  if (!oldBerita) {
    return null;
  }

  const updateData = {
    judul: data.judul,
    kategori: data.kategori,
    tanggal_berita: data.tanggal_berita,
    penulis: data.penulis,
    isi_berita: data.isi_berita,
    status: data.status,
  };

  // ==========================================
  // HANYA UPDATE GAMBAR JIKA ADA GAMBAR BARU
  // ==========================================

  if (data.gambar) {
    updateData.gambar = data.gambar;
  }


  const result = await beritaRepository.update(
    id,
    updateData
  );

  // ==========================================
  // HAPUS GAMBAR LAMA JIKA ADA GAMBAR BARU
  // ==========================================

  if (
    result &&
    data.gambar &&
    oldBerita.gambar &&
    oldBerita.gambar !== data.gambar
  ) {
    deleteImage(oldBerita.gambar);
  }

  return result;
};


/**
 * ==========================================
 * DELETE
 * ==========================================
 */
const remove = async (id) => {

    // ======================================
    // CARI DATA BERITA
    // ======================================

    const berita =
        await beritaRepository.findById(id);


    if (!berita) {
        return null;
    }


    const result =
        await beritaRepository.remove(id);


    if (
        result &&
        berita.gambar
    ) {

        deleteImage(
            berita.gambar
        );
    }


    return result;
};


const removeUploadedImage = (
    filename
) => {

    deleteImage(filename);

};
const getWebList = async () => {
  return await beritaRepository.getWebList();
};


const getWebListPaginationService = async ({
    page = 1,
    size = 10,
} = {}) => {

    // ========================================================
    // PANGGIL REPOSITORY
    // ========================================================

    const result = await beritaRepository.getWebListPagination({
        page,
        size,
    });

    // ========================================================
    // RETURN HASIL
    // ========================================================

    return result;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    removeUploadedImage,
    getWebList,
    getWebListPaginationService
};