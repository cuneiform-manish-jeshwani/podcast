import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import controller from "./userController";
import checkAccessKey from "../../middlewares/checkAccessKey";
import validation from "./userValidation";
import { handleProfileUpload } from "../../middlewares/multer";
const router = express.Router();

router.post(
  "/register",
  checkAccessKey,
  validation.register,
  controller.register
);

router.post(
  "/login",
  checkAccessKey,
  validation.login,
  controller.login
);

router.post(
  `/get-detail`,
   checkAccessKey,
  checkAuth.User,
  controller.detail
);

router.put(
  `/update-detail`,
  checkAccessKey,
  checkAuth.User,
  validation.update,
  controller.updateDetail
);

router.put(
  `/change-profilePicture`,
       checkAccessKey,
  checkAuth.User,
 handleProfileUpload,
  validation.changeProfilePicture,
  controller.changeProfilePicture
);


export default router;
