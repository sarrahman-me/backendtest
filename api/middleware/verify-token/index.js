import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../../config/logger.js";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const { tx } = req.cookies;

  if (!tx) {
    logger.info("Pengguna mengakses data tanpa login");
    return res.status(401).json({
      status: 401,
      message: "Silakan login terlebih dahulu",
    });
  }

  jwt.verify(
    tx,
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
    (err, decoded) => {
      if (err) {
        logger.info("Token tidak valid atau sudah kadaluwarsa");
        return res.status(401).json({
          status: 401,
          message: "Token tidak valid atau sudah kadaluwarsa",
        });
      }
      req.user = decoded;
      next();
    }
  );
};
