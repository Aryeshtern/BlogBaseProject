import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/postRoutes";
import userRouter from "./routes/userRoutes";
import AuthRouter from "./routes/authRouter";
import connectDB from "./config/db";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options from "./utils/swaggerOptions";

const openapiSpecification = swaggerJsdoc(options);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

connectDB();

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
