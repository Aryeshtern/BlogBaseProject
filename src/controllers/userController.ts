import { Request, Response } from "express";
import * as userService from "../services/userServices";

export const createUser = async (req: Request, res: Response) => {
    if(!req.body){
        res.status(400).json({ message: "Invalid request body" });
        return;
    }
    const newUser = await userService.createUserDB(req.body)
    res.status(201).json(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsersDB();
  res.json(users);
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const param = req.params.username;
  const user = await userService.getUserBynameDB(param);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
};

// Optionally, add DELETE and EDIT functions
