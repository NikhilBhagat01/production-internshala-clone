import express from "express";
import {
  addbookmarkController,
  getallbookmarksController,
  isBookmarkedController,
  loginController,
  registerController,
} from "../controllers/userControllers.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// REGISTER || POST

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/addbookmark", verifyToken, addbookmarkController);

router.get("/getallbookmarks", verifyToken, getallbookmarksController);

router.get("/isbookmarked/:jobId", verifyToken, isBookmarkedController);

export default router;
