import userModel from "../models/userModel.js";
import jobsModel from "../models/jobsModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const isHrAvailable = req.body.isHr ? true : false;

  try {
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(409).json({ message: "Email already in exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isHr: isHrAvailable,
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { _id: user._id, isHr: user.isHr },
      process.env.JWT_SECRET
    );
    const { password, ...otherinfo } = user._doc;

    res.status(200).json({ success: true, userInfo: otherinfo, token });
  } catch (error) {
    console.log(error);
  }
};

export const addbookmarkController = async (req, res) => {
  const userid = req.user._id;
  const { jobId } = req.body;

  try {
    const user = await userModel.findById(userid);
    if (user.bookmarks.includes(jobId)) {
      await user.updateOne({ $pull: { bookmarks: jobId } });
      res
        .status(200)
        .json({ success: true, message: "Job removed from bookmarks" });
    } else {
      await user.updateOne({ $push: { bookmarks: jobId } });
      res
        .status(200)
        .json({ success: true, message: "Job added to bookmarks" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const isBookmarkedController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const isBookmarked = user.bookmarks.includes(req.params.jobId);

    res.status(200).json({ success: isBookmarked });
  } catch (error) {
    console.log(error);
  }
};

export const getallbookmarksController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    const bookmarks = await Promise.all(
      user.bookmarks.map((b) => {
        return jobsModel.findById(b).populate("Company");
      })
    );

    res.status(200).json({ success: true, bookmarks });
  } catch (error) {
    console.log(error);
  }
};
