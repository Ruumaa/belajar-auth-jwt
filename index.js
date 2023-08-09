import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; //pasing dan mengelola cookie
import { dirname, join } from "path"; //impor fungsi  dirname dan join dari modul bawaan 'path', untuk manipulasi pathfile dan direktori dalam sistem
import { fileURLToPath } from "url"; //impor fungsi fileURLToPath untuk mengubah URL file menjadi path file dalam sistem file
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url)); //menghitung direktori saat ini(dirname) dari file yg sedang dieksekusi
//import.meta.url : memberikan URL dari modul saat ini(URL dr file yg sedang di eksekusi)
//fileURLToPath : mengubah URL menjadi path file dalam sistem file

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = { credentials: true, origin: process.env.URL || "*" }; //untuk identify http only cookie terkirim ke browser

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use("/", express.static(join(__dirname, "public"))); //menaruh static file di folder public
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
