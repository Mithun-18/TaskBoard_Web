import express from "express";
import cors from 'cors';

const app = express();

app.use(cors());
// used to parse json, urlencoded  req body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Import Routes
import userRoutes from "./routes/user.routes.js";

app.use("/", (_, res) => {
  res.send("Server is running...!");
});

app.use("/api/v1/users", userRoutes);

export { app };
