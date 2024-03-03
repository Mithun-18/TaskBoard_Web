import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin:process.env.FRONTEND_URL,
  })
);

// Import Routes
import userRoutes from "./routes/user.routes.js";

app.get("/", (_, res) => {
  res.send("Server is running...!");
});

app.use("/api/v1/users", userRoutes);

export { app };
