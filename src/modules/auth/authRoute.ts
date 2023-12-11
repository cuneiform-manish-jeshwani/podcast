import express from "express";
const router = express.Router();
import validation from "../auth/authValidation";
import controller from "../auth/authController";
import checkAccessKey from "../../middlewares/checkAccessKey";

router.post(
  `/getAccessKey`,
  validation.getAccessKey,
  controller.getAccessKey
);

router.post(
  `/send-otp`,
  checkAccessKey,
  validation.sendOTP,
  controller.sendOTP
);

router.post(
  `/verify-otp`,
  checkAccessKey,
  validation.verifyOTP,
  controller.verifyOTP
);


export default router;
