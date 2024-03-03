import { app } from "./app.js";
import { checkConnection } from "./db/index.js";

const port = process.env.PORT || 3000;

checkConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((_) => {
    process.exit(1);
  });
