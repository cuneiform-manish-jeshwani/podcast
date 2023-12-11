import mongoose, { Schema, model } from "mongoose";

const tokenSchema = new Schema(
  {
    tokenable_type: {
      type: String,
      required: true,
    },
    tokenable_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    iv: {
      type: String,
      required: true,
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: {} }
);

const Token = model("token", tokenSchema);

export default Token;
