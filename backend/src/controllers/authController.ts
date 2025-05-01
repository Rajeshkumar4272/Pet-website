import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/generateToken";
import { cookieOptions } from "../utils/cookieOptions";
import { ApiResponse } from "../utils/ApiResponse";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("Email already in use", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ email, password: hashedPassword });
    const token = generateToken(newUser._id.toString());

    // Convert to plain object and remove password
    const userObj = newUser.toObject() as Partial<IUser>;
    delete userObj.password;

    res.cookie("token", token, cookieOptions);
    res
      .status(201)
      .json(
        new ApiResponse({ message: "User created successfully.", data: { token, user: userObj } })
      );
  } catch (err: unknown) {
    next(err);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = generateToken(user._id.toString());

    const userObj = user.toObject() as Partial<IUser>;
    delete userObj.password;

    res.cookie("token", token, cookieOptions);
    res
      .status(200)
      .json(
        new ApiResponse({ message: "User loged in successfully.", data: { token, user: userObj } })
      );
  } catch (err: unknown) {
    next(err);
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).json(new ApiResponse({ success: true, message: "Logged out successfully" }));
};
