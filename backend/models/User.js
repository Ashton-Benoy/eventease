import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String },
    passwordHash: { type: String, select: false },
    role: {
      type: String,
      enum: ["admin", "organizer", "attendee", "user"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
    inactiveReason: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
