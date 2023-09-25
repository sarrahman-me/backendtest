import logger from "../../config/logger.js";
import db from "../../database/index.js";

const Users = db.users;

// mengambil profil user yang sedang login
export const currentUserLogin = async (req, res) => {
  try {
    // Cek apakah username sudah ada
    const user = await Users.findOne({
      where: {
        username: req.user.username,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Akun tidak ditemukan",
        error: {
          fields: {
            email: "Akun tidak ditemukan",
          },
        },
      });
    }

    logger.http(`current user login : ${req.user.username}`);
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Data user ditemukan",
      data: user,
    });
  } catch (error) {
    logger.error(
      `terjadi kesalahan saat mengambil current user login : ${req.user.username}`
    );
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

export default currentUserLogin;
