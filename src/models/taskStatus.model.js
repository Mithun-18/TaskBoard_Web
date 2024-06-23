import mongoose from "mongoose";

const taskStatusSchema = mongoose.Schema({
  task_id: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  is_deleted: {
    type: Number,
    required: true,
  },
});

const TaskStatusModel = mongoose.model("tbl_task_status", taskStatusSchema);

export { TaskStatusModel };
