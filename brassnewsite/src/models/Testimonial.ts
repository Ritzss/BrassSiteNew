import { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    designation: String,

    review: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
    },

    image: String,

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Testimonial ||
  model("Testimonial", TestimonialSchema);