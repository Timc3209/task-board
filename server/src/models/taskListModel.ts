import * as mongoose from "mongoose";

const TaskListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Text is required",
  },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("TaskList", TaskListSchema);
