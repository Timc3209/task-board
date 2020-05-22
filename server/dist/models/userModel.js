"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: "Text is required",
        unique: true,
    },
    password: {
        type: String,
        required: "Text is required",
    },
    currentBoard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
UserSchema.pre("save", function (next) {
    if (this.password && this.isModified("password")) {
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        const hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
    }
    next();
});
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};
exports.default = mongoose.model("User", UserSchema);
//# sourceMappingURL=userModel.js.map