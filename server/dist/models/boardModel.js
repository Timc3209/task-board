"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const BoardSchema = new mongoose.Schema({
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
exports.default = mongoose.model("Board", BoardSchema);
//# sourceMappingURL=boardModel.js.map