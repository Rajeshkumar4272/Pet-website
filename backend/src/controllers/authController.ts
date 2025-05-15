import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";
import { generateToken } from "../utils/generateToken";
import { cookieOptions } from "../utils/cookieOptions";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, ...rest } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new ApiError({ message: "Email already in use", statusCode: 400 }));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const fileUrl = `${req.protocol}://${req.get("host")}/${req.file?.filename}`;

    const newUser = await User.create({
      email,
      password: hashedPassword,
      ...rest,
      profileUrl: fileUrl,
    });

    const token = generateToken(newUser._id as string);

    // Convert to plain object and remove password
    const userObj = newUser.toObject() as Partial<IUser>;
    delete userObj.password;

    res.cookie("token", token, cookieOptions);

    res.status(201).json(
      new ApiResponse({
        message: "User created successfully.",
        data: { token, user: userObj },
        statusCode: 201,
      })
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
      return next(new ApiError("Invalid credentials", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ApiError("Invalid credentials", 401));
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
