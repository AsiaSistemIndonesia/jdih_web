const express = require("express");

const {
  loginController,
  sessionController,
  logoutController,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/authMiddleware");
const guestMiddleware = require("../middleware/guestMiddleware");

const router = express.Router();

/**
 * LOGIN
 *
 * Hanya user yang BELUM login
 * yang boleh mengakses endpoint ini.
 */
router.post("/", guestMiddleware, loginController);

/**
 * SESSION / CURRENT USER
 *
 * Hanya user yang SUDAH login
 * yang boleh mengakses endpoint ini.
 */
router.get("/session", authMiddleware, sessionController);

/**
 * LOGOUT
 *
 * Hanya user yang SUDAH login
 * yang boleh logout.
 */
router.post("/logout", authMiddleware, logoutController);

module.exports = router;