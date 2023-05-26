import express from "express";
import {
  createcompany,
  getsinglecompanyController,
  getuserscompanyController,
  updatecompanyController,
} from "../controllers/companyControllers.js";

const router = express.Router();

// CREATE COMPANY || POST

router.post("/createcompany", createcompany);

// GET INFO OF A SINGLE COMPANY || GET
router.get("/getsinglecompany/:companyId", getsinglecompanyController);

// GET COMPANIES CREATED BY A PARTICULAR USER || GET

router.get("/getuserscompany", getuserscompanyController);

// UPDATE COMPANY || PUT

router.put("/updatecompany/:companyId", updatecompanyController);

export default router;
