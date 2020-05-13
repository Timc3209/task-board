"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
exports.default = mongoose.model("Task", taskSchema);
//# sourceMappingURL=taskModel.js.map