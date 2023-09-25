import validator from "validator";
import bcrypt from "bcrypt";
import db from "../../database/index.js";
import logger from "../../config/logger.js";

const Users = db.users;

// pendaftaran user baru
const registerUsers = async (req, res) => {
  const { nama, username, email, whatsapp, password } = req.body;

  // Validasi input
  if (!nama || !username || !email || !whatsapp || !password) {
    logger.http("Data tidak lengkap");
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Data tidak lengkap",
      error: {
        fields: {
          nama: !nama ? "Nama harus diisi" : "",
          username: !username ? "Username harus diisi" : "",
          email: !email ? "email harus diisi" : "",
          whatsapp: !whatsapp ? "Nomor WhatsApp harus diisi" : "",
          password: !password ? "Password harus diisi" : "",
        },
      },
    });
  }

  if (!validator.isEmail(email)) {
    logger.http("Email tidak valid");
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Email tidak valid",
      error: {
        fields: {
          email: "Email tidak valid",
        },
      },
    });
  }

  if (!validator.isMobilePhone(whatsapp, "id-ID")) {
    logger.http("Nomor WhatsApp tidak valid");
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Nomor WhatsApp tidak valid",
      error: {
        fields: {
          whatsapp: "Nomor WhatsApp tidak valid",
        },
      },
    });
  }

  // Cek apakah username sudah ada
  const existingUser = await Users.findOne({
    where: {
      username,
    },
  });

  if (existingUser) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Username sudah digunakan",
      error: {
        fields: {
          username: "Username sudah digunakan",
        },
      },
    });
  }

  // pengecekan apakah nomor whatsapp sudah digunakan
  const existingWa = await Users.findOne({
    where: {
      whatsapp,
    },
  });

  if (existingWa) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Whatsapp sudah digunakan",
    });
  }

  // pengecekan apakah nomor whatsapp sudah digunakan
  const existingEmail = await Users.findOne({
    where: {
      email,
    },
  });

  if (existingEmail) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Email sudah digunakan",
    });
  }

  // Enkripsi password
  const hashedPassword = await bcrypt.hash(password, 10);

  const payload = {
    nama,
    username,
    email,
    whatsapp,
    password: hashedPassword,
    lastLogin: "",
    refresh_token: "",
  };

  try {
    const data = await Users.create(payload);
    logger.http("Pendaftaran user berhasil");
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Pendaftaran user berhasil",
      data,
    });
  } catch (error) {
    logger.error(`terjadi kesalahan saat mendaftar user baru`);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "terjadi kesalahan saat mendaftar user baru",
      error,
    });
  }
};

export default registerUsers;
