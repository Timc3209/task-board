import * as mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Text is required",
  },
  taskList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskList",
    required: true,
  },
  sortOrder: {
    type: Number,
    required: "number is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Task", taskSchema);
