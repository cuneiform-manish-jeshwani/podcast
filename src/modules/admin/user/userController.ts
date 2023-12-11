import { Request, Response, NextFunction } from "express";
import constants from "../../../utils/constants";
import User from "../../../models/user";
import {
  createPassword,
  getFileName,
  getUsername,
  hashPassword,
  photoUrl,
  removePhoto,
} from "../../../helpers/helper";
import message from "../user/userConstant";
import sendMail from "../../../helpers/mail";
import mongoose from "mongoose";

const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    User.create({
      fname: req.body.first_name,
      lname: req.body.last_name,
      email: req.body.email,
      username: await getUsername(req.body.email),
      password: await hashPassword(
        await createPassword(req.body.first_name, req.body.date_of_birth)
      ),
      phone: req.body.phone,
      gender: req.body.gender,
      dob: req.body.date_of_birth,
      role: req.body.role,
      privileges: req.body.privileges,
      createdBy: req.id,
    })
      .then(async (data) => {
        if (!data) {
          throw {
            statusCode: constants.code.dataNotFound,
            msg: constants.message.dataNotFound,
          };
        } else {
          const payload = {
            to: data?.email,
            title: constants.emailTitle.credential,
            data: data?.email,
          };

          await sendMail(payload);

          res.status(constants.code.success).json({
            status: constants.status.statusTrue,
            userStatus: req.status,
            message: message.userAddSuccess,
          });
        }
      })
      .catch((err) => {
        res.status(err.statusCode).json({
          status: constants.status.statusFalse,
          userStatus: req.status,
          message: err.msg,
        });
      });
  } catch (err) {
    res.status(constants.code.internalServerError).json({
      status: constants.status.statusFalse,
      userStatus: req.status,
      message: err,
    });
  }
};



export default {
  create,

};
