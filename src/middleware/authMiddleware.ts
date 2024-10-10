import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface authRequest extends Request {
  user?: { userId: string };
}

export const authenticateToken = async (
  req: authRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "No token provided." });
    return;
  }
  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        req.user = decoded;
      }
    );
    next();
  } catch {
    res.status(403).json({ message: "Invalid token." });
    return;
  }
};
