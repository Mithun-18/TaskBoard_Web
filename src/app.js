import express from "express";

const app = express();

// Import Routes
import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

export { app };
