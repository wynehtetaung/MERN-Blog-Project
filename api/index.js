import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_STR =
  process.env.MONGO_ATLAS || "mongodb://127.0.0.1:27017/mern-blog";

mongoose
  .connect(MONGO_STR)
  .then(() => {
    console.log(`MongoDB connected!`);
    mongoose.model("user", mongoose.Schema({}));
  })
  .catch((e) => {
    const err = new Error(e);
    console.log("Error Message :", err.message);
  });

app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
