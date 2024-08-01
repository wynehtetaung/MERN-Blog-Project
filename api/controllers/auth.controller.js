import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { removeSpace } from "../utils/utils.js";
import bcrypt from "bcrypt";
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!removeSpace(name) || !removeSpace(email) || !removeSpace(password)) {
    next(errorHandler(400, "All fields are required."));
    return false;
  }
  const hash = await bcrypt.hash(password, 10);
  await new User({
    name,
    email,
    password: hash,
  })
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: "signup successful",
      });
    })
    .catch((e) => {
      next(errorHandler(409, new Error(e).message));
    });
};
