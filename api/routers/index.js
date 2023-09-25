import express from "express";
import { authRouter } from "./auth/index.js";

const routers = express.Router();

routers.use(authRouter);

export default routers;