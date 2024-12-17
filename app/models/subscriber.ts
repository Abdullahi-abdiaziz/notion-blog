import { Schema, model, models } from "mongoose";

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Subscriber = models.Subscriber || model("Subscriber", subscriberSchema);

export default Subscriber;
