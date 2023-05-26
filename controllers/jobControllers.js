import companyModel from "../models/companyModel.js";
import jobsModel from "../models/jobsModel.js";
import userModel from "../models/userModel.js";

export const createJobController = async (req, res) => {
  if (!req.user.isHr)
    return res.status(404).json({ message: "only hr can post jobs" });

  const com = await companyModel.findById(req.body.Company);

  // console.log(req.user._id);
  // console.log(com);
  // console.log(typeof req.user._id);
  // console.log(typeof com.owner.toString());

  if (req.user._id !== com.owner.toString()) {
    return res
      .status(404)
      .json({ message: `you are not owner of ${com.name} company ` });
  }

  const newJob = await jobsModel.create({
    // jobTitle,
    // Company,
    // location,
    // perks,
    // keyResponsibilities,

    ...req.body,
    postedBy: req.user._id,
  });

  return res.status(200).json({ success: true, job: newJob });
};

export const getAllJobsController = async (req, res) => {
  const { category, location, experience, search } = req.query;

  const queryObject = {};
  if (category && category !== "All") {
    queryObject.category = category;
  }
  if (location && location !== "All") {
    queryObject.location = location;
  }
  if (experience && experience !== "All") {
    queryObject.experience = Number(experience);
  }
  if (search) {
    queryObject.jobTitle = { $regex: search, $options: "i" };
  }
  try {
    let jobs1 = await jobsModel
      .find(queryObject)
      .populate("Company")
      .sort({ createdAt: -1 });
    const jobs2 = jobs1.map((j) => {
      j.postedBy.password = undefined;

      return j;
    });
    // jobs.postedBy.password = undefined;
    res
      .status(200)
      .json({ success: true, jobsCount: jobs1.length, jobs: jobs2 });
  } catch (error) {
    console.log(error);
  }
};

export const getJobController = async (req, res) => {
  const { jobId } = req.params;

  let job = await jobsModel.findById(jobId).populate("postedBy Company");

  job.postedBy.password = undefined;

  res.status(200).json({ success: true, job });
};

export const deleteJobController = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user._id;

  try {
    const job = await jobsModel.findOne({ _id: jobId });

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== userId) {
      return res.status(404).json({ message: "you can not delete this job" });
    }

    await job.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const updateJobController = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user._id;

  try {
    const job = await jobsModel.findOne({ _id: jobId });

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== userId) {
      return res.status(404).json({ message: "you can not update this job" });
    }

    const updatedJob = await jobsModel.findByIdAndUpdate(
      jobId,
      { ...req.body },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "job updated successfully", updatedJob });
  } catch (error) {
    console.log(error);
  }
};

export const getlatestjobsController = async (req, res) => {
  try {
    const Jobs = await jobsModel
      .find({})
      .limit(4)
      .populate("Company")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, Jobs });
  } catch (error) {}
};

export const getalljobbyuserController = async (req, res) => {
  try {
    const allJobsbyuser = await jobsModel
      .find({ postedBy: req.user._id })
      .populate("Company")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, allJobsbyuser });
  } catch (error) {}
};
