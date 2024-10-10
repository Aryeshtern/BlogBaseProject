import { Request, Response } from "express";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
    const { username, password, email ,profile} = req.body;
    const newUser = new User({
        username,
        password,
        email,
        profile
    })
    await newUser.save();
    res.status(201).json(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find().select("-password");
    res.json(users);
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const par = req.params.username;
    const user = await User.findOne({username: par});
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(200).json(user);
};

// Optionally, add DELETE and EDIT functions
