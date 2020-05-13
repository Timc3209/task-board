import * as mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Text is required",
    unique: true,
  },
  taskList: [
    { type: mongoose.Schema.Types.ObjectId, ref: "TaskList", required: true },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Board", boardSchema);
