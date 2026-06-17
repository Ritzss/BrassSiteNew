import { Schema, model, models } from "mongoose";

const SettingSchema = new Schema(
  {
    siteName: {
      type: String,
      default: "Brass",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    shippingFee: {
      type: Number,
      default: 0,
    },

    freeShippingAbove: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Setting ||
  model("Setting", SettingSchema);