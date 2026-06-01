import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
  otp?: string | null;
  otpExpiry?: Date | null;
}
const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
  },
  { timestamps: true },
);
export default mongoose.model<IUser>("User", userSchema);
