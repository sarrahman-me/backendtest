import logger from "../../config/logger.js";
import db from "../../database/index.js";

const Users = db.users;

// user logout
const logoutUser = async (req, res) => {
  try {
    const DataUpdated = {
      refreshToken: "",
    };

    await Users.update(DataUpdated, { where: { username: req.user.username } });

    // Hapus token dan refresh token dari cookies
    res.clearCookie("tx");
    res.clearCookie("rtx");

    logger.http(`user dengan username ${req.user.username} berhasil logout`);
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Logout berhasil",
    });
  } catch (error) {
    logger.error(`user dengan username ${req.user.username} gagal logout`);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

export default logoutUser;
