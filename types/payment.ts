import { Schema } from "mongoose";

interface IPAYMENT {
  imageUrl: string;
  orderId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  status: string;
}
export default IPAYMENT;
