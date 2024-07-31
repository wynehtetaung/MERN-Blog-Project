import User from "../models/user.model.js";
import { removeSpace } from "../utils/utils.js";
import bcrypt from "bcrypt";
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!removeSpace(name) || !removeSpace(email) || !removeSpace(password)) {
    res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
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
      res.status(400).json({
        success: false,
        message: new Error(e).message,
      });
    });
};
