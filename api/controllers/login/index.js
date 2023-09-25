import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../database/index.js";
import logger from "../../config/logger.js";

const Users = db.users;

dotenv.config();

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    logger.http("Data tidak lengkap");
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Data tidak lengkap",
      error: {
        fields: {
          email: !email ? "Email harus diisi" : "",
          password: !password ? "Password harus diisi" : "",
        },
      },
    });
  }

  try {
    // Cek apakah username sudah ada
    const user = await Users.findOne({
      where: {
        email,
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

    // Cek apakah password sesuai dengan password di server
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.http("Password salah");
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password salah",
        error: {
          fields: {
            password: "Password salah",
          },
        },
      });
    }

    const payload = {
      id: user.id,
      nama: user.nama,
      username: user.username,
      whatsapp: user.whatsapp,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("tx", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie("rtx", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    const DataUpdated = {
      refreshToken,
      lastLogin: String(new Date()),
    };

    await Users.update(DataUpdated, { where: { email } });

    logger.http("Login Berhasil");
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Login Berhasil",
      data: {
        token,
        refreshToken,
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      logger.error("Akun tidak ditemukan");
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Akun tidak ditemukan",
        error: {
          fields: {
            username: "Akun tidak ditemukan",
          },
        },
      });
    } else {
      logger.error("terjadi kesalahan saat mencoba login");
      return res.status(500).json({
        status: 500,
        success: false,
        message: "terjadi kesalahan saat mencoba login",
        error,
      });
    }
  }
};

export default loginUser;
