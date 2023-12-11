import express from "express";
const router = express.Router();
import validation from "../admin/adminValidation";
import controller from "../admin/adminController";
//import accessRateLimiter from "../../middlewares/accessRateLimiter";
import checkAccessKey from "../../middlewares/checkAccessKey";
import checkAuth from "../../middlewares/checkAuth";
import { handleProfileUpload } from "../../middlewares/multer";

router.post(
  `/login`,
 // accessRateLimiter,
  checkAccessKey,
  validation.login,
  controller.login
);


export default router;
