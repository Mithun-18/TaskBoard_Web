import mongoose from "mongoose";

const boardsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const BoardModel = mongoose.model("tbl_boards", boardsSchema);

export { BoardModel };
