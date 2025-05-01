import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });
};
