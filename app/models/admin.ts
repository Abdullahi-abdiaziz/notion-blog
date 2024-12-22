import { model, models, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Add an index for the email field
adminSchema.index({ email: 1, username: 1 });

const Admin = models.Login || model("Login", adminSchema);
export default Admin;
