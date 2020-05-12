"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Text is required",
    },
    taskList: [
        { type: mongoose.Schema.Types.ObjectId, ref: "TaskList", required: true },
    ],
});
exports.default = mongoose.model("Board", boardSchema);
//# sourceMappingURL=boardModel.js.map