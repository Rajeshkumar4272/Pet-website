import mongoose, { Document, Schema } from "mongoose";

export interface IPetType extends Document {
  name: string;
  description?: string;
}

const petTypeSchema = new Schema<IPetType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const PetType = mongoose.model<IPetType>("PetType", petTypeSchema);
