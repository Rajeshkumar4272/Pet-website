import mongoose, { Document, Schema } from "mongoose";

export interface IPetType extends Document {
  name: string;
  description?: string;
}

const PetTypeSchema = new Schema<IPetType>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IPetType>("PetType", PetTypeSchema);
