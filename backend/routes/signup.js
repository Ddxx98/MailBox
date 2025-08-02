import express from "express";
import signupController from "../controllers/signup.js";

const router = express.Router();

router.post("/signup", signupController.signup);

export default router;