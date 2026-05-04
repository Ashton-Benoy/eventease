import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["going", "maybe", "not_going"],
      default: "going",
    },
  },
  { timestamps: true }
);

export default mongoose.model("RSVP", rsvpSchema);
