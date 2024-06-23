import mongoose from "mongoose";

function checkConnection() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then((_) => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export { checkConnection };
