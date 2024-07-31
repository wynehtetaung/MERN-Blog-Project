import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRoutes } from "./routes/user.route.js";
import { authRoutes } from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_STR =
  process.env.MONGO_ATLAS || "mongodb://127.0.0.1:27017/mern-blog";

app.use(express.json());

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

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
