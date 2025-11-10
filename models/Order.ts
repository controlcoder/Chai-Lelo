import mongoose, { Schema, Model } from "mongoose";
import IORDER from "@/types/order";

const OrderSchema = new Schema<IORDER>(
  {
    food: {
      type: String,
      required: true,
      trim: true,
    },
    orderedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "uploaded", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IORDER> =
  mongoose.models.Order || mongoose.model<IORDER>("Order", OrderSchema);

export default Order;
