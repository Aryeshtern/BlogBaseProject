import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  addComment,
} from "../controllers/postController";
import { errorHendler } from "../middleware/errorHandler";
import { authenticateToken } from "../middleware/authMiddleware";

const postRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: API for managing posts and comments
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags: [Posts]
 *     summary: Create a new post
 *     description: Adds a new post to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePost'
 *     responses:
 *       201:
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request, invalid input.

 *   get:
 *     tags: [Posts]
 *     summary: Get all posts
 *     description: Retrieves a list of all posts.
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'

 * /api/posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Get a post by ID
 *     description: Retrieves a single post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found.

 *   put:
 *     tags: [Posts]
 *     summary: Update a post
 *     description: Updates an existing post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found.

 *   delete:
 *     tags: [Posts]
 *     summary: Delete a post
 *     description: Deletes a post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post deleted successfully.
 *       404:
 *         description: Post not found.

 * /api/posts/{id}/comments:
 *   post:
 *     tags: [Posts]
 *     summary: Add a comment to a post
 *     description: Adds a comment to a specific post.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to add a comment to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateComment'
 *     responses:
 *       201:
 *         description: Comment added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateComment'
 *       404:
 *         description: Post not found.
 *       400:
 *         description: Bad request, invalid input.
 */

postRouter.post("/", authenticateToken, errorHendler(createPost));
postRouter.get("/", errorHendler(getPosts));
postRouter.get("/:id", errorHendler(getPost));
postRouter.put("/:id", authenticateToken, errorHendler(updatePost));
postRouter.delete("/:id", authenticateToken, errorHendler(deletePost));
postRouter.post("/:id/comments", errorHendler(addComment));

export default postRouter;
