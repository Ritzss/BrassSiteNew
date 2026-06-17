import { Schema, model, models } from "mongoose";

const BannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    buttonText: {
      type: String,
      default: "Shop Now",
    },

    buttonLink: {
      type: String,
      default: "/products",
    },

    active: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Banner ||
  model("Banner", BannerSchema);