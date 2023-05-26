/**
 jobTitle: string
 Company: ref from company model
 location:  string
 startDate: string
 ctc: number
 experience: number
 applyBy: string
 keyResponsibilities: array of string values
 perks: array of string values
 numOfOpenings: number
 postedBy: ref from user model

 */

import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    Company: {
      type: mongoose.Types.ObjectId,
      ref: "companies",
    },
    location: {
      type: String,
    },
    category: {
      type: String,
    },
    startDate: String,
    ctc: String,
    experience: Number,
    applyBy: String,
    jobType: { type: String, default: "Full Time" },
    keyResponsibilities: { type: Array, default: [] },
    perks: { type: Array, default: [] },
    numOfOpenings: Number,
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("jobs", jobsSchema);
