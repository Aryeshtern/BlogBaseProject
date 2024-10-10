import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/postModel";
import User from "../models/userModel";
import {authRequest} from "../middleware/authMiddleware"
import { createPostDB } from '../services/postSevices'
import {IUser} from "../models/userModel";
// Create a new post
export const createPost = async (
  req: authRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if(!req.user || !req.user.userId){
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { title, content } = req.body;
  const user: IUser | null = await User.findById(req.user.userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const newPost = await createPostDB(title, content, req.user.userId);
  res.status(201).json(newPost);
};

// Delete a post
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};



// Get all posts
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};


// Get a single post by ID
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};


// Update a post
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};


// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};


