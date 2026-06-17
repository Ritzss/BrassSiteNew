import mongoose, { Schema, models, model } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerUser",
      required: true,
    },

    items: [
      {
        productId: {
          type: Number,
          required: true,
        },

        title: String,

        // backward compatibility
        name: String,

        price: {
          type: Number,
          required: true,
        },

        qty: {
          type: Number,
          required: true,
        },

        // Drinkware / Hardware support
        capacity: Number,

        weight: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    deliveryAddress: {
      address: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default models.Order ||
  model("Order", OrderSchema, "orders");