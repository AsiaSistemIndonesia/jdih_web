const express = require("express");
const controller = require("../controllers/kontak.controller");

const router = express.Router();

router.post("/", controller.create);

router.get("/", controller.findAll);

module.exports = router;