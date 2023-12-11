import express from "express";
const router = express.Router();
import checkAccessKey from "../../../middlewares/checkAccessKey";
import checkAuth from "../../../middlewares/checkAuth";
import validation from "./cmsValidation";
import controller from "./cmsController";

router.post(
  `/add-page`,
  checkAccessKey,
  checkAuth.Admin,
  validation.create,
  controller.create
);

router.post(
  `/page-list`,
  checkAccessKey,
  checkAuth.Admin,
  controller.pageList
);


router.post(
  `/page-detail/:slug`,
  checkAccessKey,
  checkAuth.Admin,
  validation.detail,
  controller.detail
);


export default router;
