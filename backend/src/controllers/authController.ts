import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";
import { generateToken } from "../utils/generateToken";
import { cookieOptions } from "../utils/cookieOptions";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, ...rest } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError({ message: "Email already in use", statusCode: 400 });
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
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError({ message: "Invalid credentials", statusCode: 400 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError({ message: "Invalid credentials", statusCode: 400 });
  }

  const token = generateToken(user._id as string);

  const userObj = user.toObject() as Partial<IUser>;
  delete userObj.password;

  res.cookie("token", token, cookieOptions);

  res
    .status(200)
    .json(
      new ApiResponse({ message: "User loged in successfully.", data: { token, user: userObj } })
    );
});

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).json(new ApiResponse({ success: true, message: "Logged out successfully" }));
};
