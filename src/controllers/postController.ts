import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/postModel";
import User from "../models/userModel";
import { authRequest } from "../middleware/authMiddleware";
import * as userServces from "../services/postSevices";
import { IUser } from "../models/userModel";
// Create a new post
export const createPost = async (
  req: authRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user || !req.user.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { title, content } = req.body;
  const user: IUser | null = await User.findById(req.user.userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const newPost = await userServces.createPostDB(
    title,
    content,
    req.user.userId
  );
  res.status(201).json(newPost);
};

// Delete a post
export const deletePost = async (
  req: authRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user || !req.user.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  await userServces.deletePostDB(req.user.userId);
  res.status(204).send();
};

// Get all posts
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const posts = await userServces.getAllPostsDB();
  res.status(200).json(posts);
};

// Get a single post by ID
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const post = await userServces.getPostByIdDB(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  res.status(200).json(post);
};

// Update a post
export const updatePost = async (
  req: authRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user || !req.user.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  userServces.updatePostDB(req.user.userId, req.body);
};

// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await userServces.addConnentDB(req.body, req.params.id);
  res.status(201).send();
};
