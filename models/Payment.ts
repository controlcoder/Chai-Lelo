import mongoose, { Schema, Model } from "mongoose";
import IPAYMENT from "@/types/payment";

const PaymentSchema = new Schema<IPAYMENT>(
  {
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "verified"],
      default: "pending"
    },
  },
  {
    timestamps: true,
  }
);

const Payment: Model<IPAYMENT> =
  mongoose.models.Payment || mongoose.model<IPAYMENT>("Payment", PaymentSchema);

export default Payment;
