const authService = require("../services/auth.service");

const loginController = async (req, res) => {
  // try {
    const { email, password } = req.body;
    

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi",
      });
    }

    const user = await authService.loginService(email, password);

    req.session.userId = user.id;

    req.session.user = {
      id: user.id,
      nama: user.nama,
      email: user.email,
      role: user.role,
      foto: user.foto,
    };

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: user,
    });
  // } catch (error) {
  //   console.error("LOGIN ERROR:", error);

  //   if (error.message === "EMAIL_OR_PASSWORD_INVALID") {
  //     return res.status(401).json({
  //       success: false,
  //       message: "Email atau password salah",
  //     });
  //   }

  //   return res.status(500).json({
  //     success: false,
  //     message: "Terjadi kesalahan pada server",
  //   });
  // }
};

const sessionController = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: "Session tidak ditemukan",
      });
    }

    const user = await authService.getCurrentUserService(req.session.userId);

    return res.status(200).json({
      success: true,
      message: "Session aktif",
      data: user,
    });
  } catch (error) {
    console.error("SESSION ERROR:", error);

    if (error.message === "USER_NOT_FOUND") {
      req.session.destroy(() => {});

      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

const logoutController = async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        console.error("LOGOUT ERROR:", error);

        return res.status(500).json({
          success: false,
          message: "Gagal logout",
        });
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        success: true,
        message: "Logout berhasil",
      });
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  loginController,
  sessionController,
  logoutController,
};
