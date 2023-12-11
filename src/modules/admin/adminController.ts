import { Request, Response, NextFunction } from "express";
import constants from "../../utils/constants";
import User from "../../models/user";
import { createToken, deleteToken, deleteAllToken } from "../../helpers/token";
import {
  toLowerCase,
  checkPassword,
  photoUrl,
  removePhoto,
  getFileName,
  hashPassword,
  randomToken,
  minutes,
} from "../../helpers/helper";

import mongoose from "mongoose";
import sendMail from "../../helpers/mail";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    User.findOne({ email: await toLowerCase(req.body.email) })
      .then(async (data: any) => {
        if (!data) {
          throw {
            statusCode: constants.code.dataNotFound,
            msg: constants.message.invalidEmail,
          };
        } else if (
          (await checkPassword(req.body.password, data.password)) !== true
        ) {
          throw {
            statusCode: constants.code.preconditionFailed,
            msg: constants.message.invalidPassword,
          };
        } else if (!data.status) {
          throw {
            statusCode: constants.code.preconditionFailed,
            msg: constants.message.userInactive,
          };
        } else if (data.isDeleted) {
          throw {
            statusCode: constants.code.preconditionFailed,
            msg: constants.message.userDeleted,
          };
        } else if (
          data.role !== constants.accountLevel.superAdmin &&
          data.role !== constants.accountLevel.admin
        ) {
          throw {
            statusCode: constants.code.preconditionFailed,
            msg: constants.message.invalidUser,
          };
        } else {
          const payload = {
            id: data._id,
          };
          res.status(constants.code.success).json({
            status: constants.status.statusTrue,
            userStatus: data.status,
            message: constants.message.userLogin,
            token: await createToken(payload),
            data: await data.getAuthDetail(),
          });
        }
      })
      .catch((err) => {
        res.status(err.statusCode).json({
          status: constants.status.statusFalse,
          userStatus: constants.userStatus.statusFalse,
          message: err.msg,
        });
      });
  } catch (err) {
    res.status(constants.code.preconditionFailed).json({
      status: constants.status.statusFalse,
      userStatus: constants.userStatus.statusFalse,
      message: err,
    });
  }
};



export default {
  login,

};
