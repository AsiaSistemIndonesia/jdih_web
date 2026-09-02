const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {
    const token = req.cookies.access_token;


    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Silakan login terlebih dahulu.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    

    return res.status(401).json({
      success: false,
      message: "Session login tidak valid atau sudah expired.",
    });
  }
};

module.exports = authMiddleware;