import { Router } from "express";
import { Login, getUserInfo, signUp } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router()

authRoutes.post("/signup", signUp)
authRoutes.post("/login", Login)
authRoutes.post("/get-user-info", verifyToken, getUserInfo)

export default authRoutes;