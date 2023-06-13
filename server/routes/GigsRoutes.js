import multer from "multer";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { addGig, getGigData, getUserAuthGig } from "../controllers/GigsController.js";
import { Router } from "express";

export const gigsRoutes = Router();
const upload = multer({dest: "uploads/"})

gigsRoutes.post("/add", verifyToken, upload.array("images"), addGig)
gigsRoutes.get("/get-user-gigs", verifyToken, getUserAuthGig)
gigsRoutes.get("/get-gig-data/:gigId", getGigData)