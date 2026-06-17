import { Schema, models, model } from "mongoose";

const VariantSchema = new Schema(
  {
    images: [String],

    capacity: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    mrp: {
      type: Number,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const DetailsSchema = new Schema(
  {
    features: [String],

    material: String,

    finish: String,

    design: String,

    sustainability: String,

    care: [String],
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    Productid: {
      type: String,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    D_discription: {
      type: String,
    },

    category: {
      type: String,
      required: true,
    },

    subcategory: {
      type: String,
      required: true,
    },

    variants: [VariantSchema],

    details: DetailsSchema,
  },
  {
    timestamps: true,
  }
);

export default models.Product ||
  model("Product", ProductSchema);