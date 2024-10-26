import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import VideoRoutes from "./routes/videos.js";
import UserRoutes from "./routes/users.js";
import CommentRoutes from "./routes/comments.js";
import AuthRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const port = 3000;

const app = express();
dotenv.config();

mongoose.connect(process.env.DB_CONNECTION_STRING).then(()=>{
    console.log("mongoDB connected successfully!");
}).catch((err) => {
    console.error("Error:", err);
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'https://video-sharing-client.vercel.app',
    methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]  
}))

app.use("/api/users", UserRoutes);
app.use("/api/videos", VideoRoutes);
app.use("/api/comments", CommentRoutes);
app.use("/api/auth", AuthRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";

    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.get("/", (req, res) => {
    res.send("Hello bhai kaise ho?");
})


app.listen(port, () => {
    console.log("app is listening at port", port)
})