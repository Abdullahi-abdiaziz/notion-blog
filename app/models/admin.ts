import { model, models, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = models.Login || model("Login", adminSchema);
export default Admin;
