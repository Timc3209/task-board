import * as mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Text is required",
  },
  taskList: [
    { type: mongoose.Schema.Types.ObjectId, ref: "TaskList", required: true },
  ],
});

export default mongoose.model("Board", boardSchema);
