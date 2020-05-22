import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

const SALT_WORK_FACTOR = 10;

interface UserI extends mongoose.Document {
  username: string;
  password: string;
  currentBoard: string;
}

interface UserBase extends UserI {
  comparePassword(password: string): string;
}

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

UserSchema.pre<UserI>("save", function (next: any) {
  if (this.password && this.isModified("password")) {
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

export default mongoose.model<UserBase>("User", UserSchema);
