import express from "express";
import {
  registerUsers,
  loginUser,
  currentUserLogin,
  logoutUser,
} from "../../controllers/index.js";
import verifyToken from "../../middleware/index.js";

const router = express.Router();

router.post("/auth/register", registerUsers);
router.post("/auth/login", loginUser);
router.get("/auth/user", verifyToken, currentUserLogin);
router.delete("/auth/logout", verifyToken, logoutUser);

export { router as authRouter };
