import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "jobs",
    },
  },
  { timestamps: true }
);

export default mongoose.model("bookmarks", bookmarkSchema);
