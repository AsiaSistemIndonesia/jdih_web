const express = require("express");

const router = express.Router();
const sliderController = require("../controllers/slider.controller");
const beritaController = require("../controllers/berita.controller");
const dokumenHukumController = require("../controllers/dokumenHukum.controller");
const Kontakcontroller = require("../controllers/kontak.controller");
const pengaturanController = require("../controllers/pengaturan.controller");

// slider
router.get("/slider", sliderController.getResult);

// berita
router.get("/berita", beritaController.getWebList);
router.get("/pagination-berita", beritaController.getWebListController);
router.get("/berita/:id", beritaController.getById);
router.get("/berita/latest", beritaController.getLatest);
router.post("/berita/:id/views", beritaController.incrementViews);
router.get("/berita/:id/related", beritaController.getOtherBerita);

// dokumen hukum
router.get("/sumary-dashboard", dokumenHukumController.getSummary);
router.get("/dokumen-hukum", dokumenHukumController.getList);
router.get("/dokumen-hukum-pagination", dokumenHukumController.getAllWeb);
router.get("/dokumen-hukum/:id", dokumenHukumController.getById);

// kontak
router.post("/kontak", Kontakcontroller.create);

// pengaturan
router.get("/pengaturan", pengaturanController.getOne);
router.get("/sumarydokumenhukum", pengaturanController.getSummary);

module.exports = router;
