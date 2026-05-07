import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    name: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
    amount: { type: Number, required: true },
    originalAmount: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    promoCode: { type: String, uppercase: true, trim: true, default: "" },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
    razorpayOrderId: { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    razorpaySignature: { type: String, default: "" },
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

export default mongoose.model("Payment", paymentSchema);
