import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
// import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import { verifyToken } from "./utils/verifyToken.js";
import path from "path";
import {fileURLToPath} from 'url'

//configure env
dotenv.config();

//databse config
connectDB();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//rest object
const app = express();

//middelwares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/auth", userRoutes);
app.use("/api/jobs", jobRoutes);
// app.use("/api/bookmark", bookmarkRoutes);
app.use("/api/company", verifyToken, companyRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h2>Welcome to Internshala Clone</h2>");
});

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
