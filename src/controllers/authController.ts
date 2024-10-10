import { Request, Response } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/auth";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken(user._id as string);
    await user.save();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });
    res.json({ message: "Logged in successfully", token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
