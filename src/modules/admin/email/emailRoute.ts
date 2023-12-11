import express from "express";
const router = express.Router();
import checkAccessKey from "../../../middlewares/checkAccessKey";
import checkAuth from "../../../middlewares/checkAuth";
import validation from "./emailValidation";
import controller from "./emailController";

router.post(
  `/add-email`,
  checkAccessKey,
  checkAuth.Admin,
  validation.create,
  controller.create
);


router.post(
    `/email-detail/:slug`,
    checkAccessKey,
    checkAuth.Admin,
    validation.detail,
    controller.detail
  );

  router.put(
    `/update-detail/:slug`,
    checkAccessKey,
    checkAuth.Admin,
    validation.update,
    controller.update
  );

  router.delete(
    `/delete-email/:slug`,
    checkAccessKey,
    checkAuth.Admin,
    validation.deleteEmail,
    controller.deleteEmail
  )

export default router