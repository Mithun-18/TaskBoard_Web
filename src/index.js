import { app } from "./app.js";

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

const port = process.env.PORT || 3000;

connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

});


