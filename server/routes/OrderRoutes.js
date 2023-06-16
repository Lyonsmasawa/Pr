import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createOrder } from "../controllers/OrderController.js";

export const ordersRoutes = Router()

ordersRoutes.post("/create", verifyToken, createOrder)
