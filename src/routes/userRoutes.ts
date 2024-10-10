import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/userController";
import { errorHendler } from "../middleware/errorHandler";

const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Register a user
 *     description: Registers a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUser'  
 *       400:
 *         description: Bad request, invalid input.
 *       409:
 *         description: Conflict, user already exists.
 * 
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * 
 * /api/users/{username}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by username
 *     description: Retrieves a user by their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUser'
 *       404:
 *         description: User not found.
 */

userRouter.post("/", errorHendler(createUser));
userRouter.get("/", errorHendler(getUsers));
userRouter.get("/:username", errorHendler(getUser));

export default userRouter;
