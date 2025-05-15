import mongoose, { Document, Schema, Types } from "mongoose";

interface IProductVariant {
  label: string;
  stock: number;
  price?: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: "food" | "toy" | "accessory" | "medicine";
  petType: Types.ObjectId;
  breedSize?: "small" | "medium" | "large";
  ageRange?: "Puppy/Kitten" | "Adult" | "Senior";
  nutritionalInfo?: string;
  brand?: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  tags?: string[];
  variants?: IProductVariant[];
  images?: string[];
  bundles?: Types.ObjectId[];
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["food", "toy", "accessory", "medicine"],
    },
    petType: {
      type: Schema.Types.ObjectId,
      ref: "PetType",
      required: true,
    },
    breedSize: {
      type: String,
      enum: ["small", "medium", "large"],
    },
    ageRange: {
      type: String,
      enum: ["Puppy/Kitten", "Adult", "Senior"],
    },
    nutritionalInfo: { type: String },
    brand: { type: String },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    variants: {
      type: [
        {
          label: { type: String, required: true },
          stock: { type: Number, default: 0 },
          price: { type: Number },
        },
      ],
      default: [],
    },
    images: { type: [String], default: [] },
    bundles: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
