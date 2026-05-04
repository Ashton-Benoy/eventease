import mongoose from "mongoose";

const ticketTypeSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    priceCents: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    startAt: Date,
    endAt: Date,
    location: { type: String, required: true, trim: true },
    price: { type: Number, default: 0 },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tickets: [ticketTypeSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);

export default mongoose.model("Event", eventSchema);
