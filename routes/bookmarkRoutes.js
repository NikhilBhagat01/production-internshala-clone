import express from "express";
import { addBookmarkController } from "../controllers/bookmarkControllers";

const router = express.Router();

// ADD BOOKMARK || POST

router.post("/addBookmark", addBookmarkController);

export default router;
