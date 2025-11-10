import { Schema } from "mongoose";

interface IORDER {
  food: string;
  orderedBy: Schema.Types.ObjectId;
  status: string;
}
export default IORDER;
