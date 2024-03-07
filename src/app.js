import cors from 'cors';
import express from "express";

const app = express();

app.use(cors());
// used to parse json, urlencoded  req body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Import Routes
import userRoutes from "./routes/user.routes.js";
import boardRoutes from "./routes/board.routes.js";


app.get("/", (_, res) => {
  res.send("Server is running...!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tm",boardRoutes );

export { app };

