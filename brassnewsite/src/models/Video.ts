import { Schema, model, models } from "mongoose";

const VideoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnail: String,

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Video || model("Video", VideoSchema);