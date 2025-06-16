import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./database/database";
import userRouter from "./route/user/user.route";
import imageRouter from "./route/image/user.image";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

connectDatabase();

app.use('/user', userRouter)
app.use("/images", imageRouter)

app.listen(process.env.MONGODB_PORT, () => console.log("server running"));
