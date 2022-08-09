import mongoose from "mongoose";
const { model, Schema } = mongoose;

// product schema

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, required: true },
    category: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

//user model
export default model("Products", productSchema);
