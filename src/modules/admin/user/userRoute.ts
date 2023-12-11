import express from "express";
const router = express.Router();
import validation from "../user/userValidation";
import controller from "../user/userController";

import checkAccessKey from "../../../middlewares/checkAccessKey";
import checkAuth from "../../../middlewares/checkAuth";
//import { handleProfileUpload } from "../../../middlewares/multer";

router.post(
  `/add-user`,
  checkAccessKey,
  checkAuth.Admin,
  validation.create,
  controller.create
);

export default router;
