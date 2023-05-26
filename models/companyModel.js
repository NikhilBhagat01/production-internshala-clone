/*
name:
desc:
url:
logo:
owner: ref from user model

*/

import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: { type: String },
    url: String,
    logo: String,
    owner: { type: mongoose.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export default mongoose.model("companies", companySchema);
