import mongoose from "mongoose";

const tasksSchema = mongoose.Schema({
  board_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc_task: {
    type: String,
    required: true,
  },
});

const TaskModel = mongoose.model("tbl_tasks", tasksSchema);

export { TaskModel };
