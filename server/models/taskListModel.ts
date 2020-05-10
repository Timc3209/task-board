import * as mongoose from "mongoose";

const taskListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Text is required",
  },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

export default mongoose.model("TaskList", taskListSchema);
