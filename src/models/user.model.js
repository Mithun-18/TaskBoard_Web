import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("tbl_users", usersSchema);

export { UserModel };
