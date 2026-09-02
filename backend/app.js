const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const sliderRoutes = require("./routes/slider.routes");
const beritaRoutes = require("./routes/berita.routes");
const kontakRoute = require("./routes/kontak.route");
const userRoute = require("./routes/user.route");
const dokumenHukumRoute = require("./routes/dokumenHukum.route");
const pengaturanRoute = require("./routes/pengaturan.route");
const authRoutes = require("./routes/auth.route");

const app = express();

app.use(
  cors({
    origin: "https://jdih.asiasistem.com",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(cookieParser());

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api/master-data/login", authRoutes);

app.use("/api/master-data/slider", sliderRoutes);

app.use("/api/master-data/berita", beritaRoutes);

app.use("/api/master-data/kontak", kontakRoute);

app.use("/api/master-data/user", userRoute);

app.use("/api/master-data/dokumen-hukum", dokumenHukumRoute);

app.use("/api/master-data/pengaturan", pengaturanRoute);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
    path: req.originalUrl,
    method: req.method,
  });
});

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Ukuran gambar maksimal 3 MB",
    });
  }

  if (
    err.message &&
    (err.message.includes("Format gambar") ||
      err.message.includes("Format foto"))
  ) {
    return res.status(400).json({
      success: false,
      message: "Format gambar harus JPG, JPEG, atau PNG",
    });
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      success: false,
      message: "Field file tidak sesuai",
    });
  }

  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    err.type === "entity.parse.failed"
  ) {
    return res.status(400).json({
      success: false,
      message: "Format JSON tidak valid",
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : undefined,
  });
});

module.exports = app;