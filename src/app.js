import express from "express";

const app = express();

// Import Routes
import userRoutes from "./routes/user.routes.js";

app.use("/", (_, res) => {
  res.send("Server is running...!");
});

app.use("/api/v1/users", userRoutes);

export { app };
