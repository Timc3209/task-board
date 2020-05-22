"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
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
exports.default = mongoose.model("Task", TaskSchema);
//# sourceMappingURL=taskModel.js.map