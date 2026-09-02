const dokumenHukumService =
    require("../services/dokumenHukum.service");

const getAll = async (req, res) => {
    try {
        const result =
            await dokumenHukumService.getAll({
                search:
                    req.query.search || "",
                page:
                    req.query.page || 1,
                size:
                    req.query.size || 10,
            });

        return res.status(200).json({
            success: true,
            message:
                "Data dokumen hukum berhasil diambil",
            ...result,
        });

    } catch (error) {
        console.error(
            "GET ALL DOKUMEN HUKUM ERROR:",
            error
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getById = async (req, res) => {
    try {
        const result =
            await dokumenHukumService.getById(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error(
            "GET DOKUMEN HUKUM ERROR:",
            error
        );

        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const create = async (req, res) => {
    try {
        
        const {
            judul,
            kategori,
            nomor,
            tahun,
            bidang,
            tipe_dokumen,
            tempat_penetapan,
            tanggal_penetapan,
            tanggal_pengundangan,
            tanggal_berlaku,
            sumber,
            subject,
            status,
        } = req.body;

        const fileAbstrak =
            req.files?.file_abstrak?.[0]?.filename || null;

        const fileDokumen =
            req.files?.file_dokumen?.[0]?.filename || null;



        if (!judul) {
            return res.status(400).json({
                success: false,
                message: "Judul wajib diisi",
            });
        }

        const result =
            await dokumenHukumService.create({
                judul,
                kategori,
                nomor,
                tahun,
                file_abstrak: fileAbstrak,
                file_dokumen: fileDokumen,
                bidang,
                tipe_dokumen,
                tempat_penetapan,
                tanggal_penetapan,
                tanggal_pengundangan,
                tanggal_berlaku,
                sumber,
                subject,
                status,
            });

        return res.status(201).json({
            success: true,
            message: "Dokumen hukum berhasil dibuat",
            data: result,
        });

    } catch (error) {
        console.error(
            "CREATE DOKUMEN HUKUM ERROR:",
            error
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const update = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            judul,
            kategori,
            nomor,
            tahun,
            bidang,
            tipe_dokumen,
            tempat_penetapan,
            tanggal_penetapan,
            tanggal_pengundangan,
            tanggal_berlaku,
            sumber,
            subject,
            status,
        } = req.body || {};

        const file_abstrak =
            req.files?.file_abstrak?.[0]
                ?.filename || null;

        const file_dokumen =
            req.files?.file_dokumen?.[0]
                ?.filename || null;

        const result =
            await dokumenHukumService.update(
                id,
                {
                    judul,
                    kategori,
                    nomor,
                    tahun,
                    file_abstrak,
                    file_dokumen,
                    bidang,
                    tipe_dokumen,
                    tempat_penetapan,
                    tanggal_penetapan,
                    tanggal_pengundangan,
                    tanggal_berlaku,
                    sumber,
                    subject,
                    status
                }
            );

        return res.status(200).json({
            success: true,
            message:
                "Dokumen hukum berhasil diperbarui",
            data: result,
        });

    } catch (error) {
        console.error(
            "UPDATE DOKUMEN HUKUM ERROR:",
            error
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const remove = async (req, res) => {
    try {
        const result =
            await dokumenHukumService.remove(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            message: result.message,
        });

    } catch (error) {
        console.error(
            "DELETE DOKUMEN HUKUM ERROR:",
            error
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const incrementView = async (req, res) => {
    try {
        const result =
            await dokumenHukumService.incrementView(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const incrementDownload = async (
    req,
    res
) => {
    try {
        const result =
            await dokumenHukumService.incrementDownload(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getSummary = async (req, res) => {
  try {
    const data = await dokumenHukumService.getSummary();

    return res.status(200).json({
      success: true,
      message: "Summary dokumen hukum berhasil diambil",
      data,
    });
  } catch (error) {
    console.error("GET SUMMARY DOKUMEN HUKUM ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil summary dokumen hukum",
      error: error.message,
    });
  }
};


const getList = async (req, res) => {
    try {
        const result = await dokumenHukumService.getList();

        return res.status(200).json({
            success: true,
            message: "Data peraturan berhasil diambil",
            data: result.data,
            total: result.total,
        });
    } catch (error) {
        console.error("GET LIST PERATURAN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Gagal mengambil data peraturan",
            error: error.message,
        });
    }
};

const getAllWeb = async (req, res) => {
    try {
        const {
            search = "",
            page = 1,
            size = 10,
            kategori = "",
            tahun = "",
            bidang = "",
        } = req.query;

        const result = await dokumenHukumService.getAllWeb({
            search,
            page,
            size,
            kategori,
            tahun,
            bidang,
        });

        return res.status(200).json({
            success: true,
            message: "Data dokumen hukum berhasil diambil",
            data: result.data,
            pagination: result.pagination,
        });
    } catch (error) {
        console.error(
            "GET ALL WEB DOKUMEN HUKUM ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Gagal mengambil data dokumen hukum",
            error: error.message,
        });
    }
};



module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    incrementView,
    incrementDownload,
    getSummary,
    getList,
    getAllWeb
};