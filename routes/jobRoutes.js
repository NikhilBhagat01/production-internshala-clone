import express from "express";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  getJobController,
  getalljobbyuserController,
  getlatestjobsController,
  updateJobController,
} from "../controllers/jobControllers.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE JOB || POST
router.post("/createjob", verifyToken, createJobController);

// GET 4 LATEST JOBS || GET

router.get("/getlatestjobs", getlatestjobsController);

// GET ALL JOBS || GET

router.get("/getalljobs", getAllJobsController);

// GET SINGLE JOB || GET

router.get("/getjob/:jobId", getJobController);

// DELETE JOB || DELETE

router.delete("/deletejob/:jobId", verifyToken, deleteJobController);

// UPDATE JOB || PUT

router.put("/updatejob/:jobId", verifyToken, updateJobController);

// GET ALL JOBS OF A SINGLE USER || GET

router.get("/getalljobbyuser", verifyToken, getalljobbyuserController);

export default router;
