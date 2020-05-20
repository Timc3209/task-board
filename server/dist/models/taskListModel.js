"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const taskListSchema = new mongoose.Schema({
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
exports.default = mongoose.model("TaskList", taskListSchema);
//# sourceMappingURL=taskListModel.js.map