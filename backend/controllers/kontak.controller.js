const kontakService = require("../services/kontak.service");

const create = async (req, res) => {
  try {
    const data = await kontakService.createKontak(req.body);

    return res.status(201).json({
      success: true,
      message: "Pesan berhasil dikirim",
      data,
    });
  } catch (error) {
    console.error("Create kontak error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const findAll = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      size = 10,
    } = req.query;

    const result = await kontakService.getAllKontak({
      search,
      page,
      size,
    });

    return res.status(200).json({
      success: true,
      message: "Data kontak berhasil diambil",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Get kontak error:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data kontak",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  findAll,
};