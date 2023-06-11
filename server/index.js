import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/AuthRoutes.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const port = process.env.PORT

// Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(cors({
    origin: ["process.env.PUBLIC_URL"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))

app.use("uploads/profiles", express.static)
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})