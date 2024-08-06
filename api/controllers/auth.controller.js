import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { removeSpace } from "../utils/utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!removeSpace(name) || !removeSpace(email) || !removeSpace(password)) {
    return next(errorHandler(400, "All fields are required."));
  }
  const hash = await bcrypt.hash(password, 10);
  try {
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
  } catch (error) {
    next(errorHandler(500, new Error(error).message));
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!removeSpace(email) || !removeSpace(password)) {
    return next(errorHandler(400, "All fields are required."));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found!"));
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password: pass, ...user } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        message: "signin successful",
        resource: user,
      });
  } catch (error) {
    next(errorHandler(500, new Error(error).message));
  }
};
