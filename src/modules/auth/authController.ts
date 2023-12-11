import { Request, Response, NextFunction } from "express";
import constants from "../../utils/constants";
import message from "./authConstant";
import Setting from "../../models/setting";
import OTP from "../../models/otp";
import { randomNumber, minutes } from "../../helpers/helper";
import sendMail from "../../helpers/mail";
import User from "../../models/user";

const getAccessKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {                         
    if (req.body.access_token !== process.env.ACCESS_TOKEN) {
      throw {
        statusCode: constants.code.preconditionFailed,
        msg: message.invalidToken,
      };
    } else {
      Setting.findOne({}).then((data: any) => {
        res.status(constants.code.success).json({
          status: constants.status.statusTrue,
          userStatus: constants.userStatus.statusFalse,
          message: constants.message.success,
          AccessKey: data.AccessKey,
        });
      });
    }
  } catch (err: any) {
    res.status(err.statusCode).json({
      status: constants.status.statusFalse,
      userStatus: constants.userStatus.statusFalse,
      message: err.msg,
    });
  }
};

const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await OTP.findOneAndUpdate(
      { email: req.body.email },
      { email: req.body.email, otp: await randomNumber() },
      { new: true, upsert: true }
    )
      .then(async (data: any) => {
        if (!data) {
          throw {
            statusCode: constants.code.dataNotFound,
            msg: constants.message.dataNotFound,
          };
        } else {
          const payload = {
            to: data?.email,
            title: constants.emailTitle.otp,
            data: data?.otp,
          };
          await sendMail(payload);
          res.status(constants.code.success).json({
            status: constants.status.statusTrue,
            userStatus: constants.userStatus.statusFalse,
            message: message.otpMailSent,
          });
        }
      })
      .catch((err: any) => {
        res.status(err.statusCode).json({
          status: constants.status.statusFalse,
          userStatus: constants.userStatus.statusFalse,
          message: err.msg,
        });
      });
  } catch (err) {
    res.status(constants.code.internalServerError).json({
      status: constants.status.statusFalse,
      userStatus: constants.userStatus.statusFalse,
      message: err,
    });
  }
};

const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    OTP.findOne({ email: req.body.email })
      .then(async (data: any) => {
        if (!data) {
          throw {
            statusCode: constants.code.dataNotFound,
            msg: constants.message.dataNotFound,
          };
        } else if ((await minutes(data.updatedAt)) >= 5) {
          throw {
            statusCode: constants.code.preconditionFailed,
            msg: message.otpExpire,
          };
        } else if (data.otp !== req.body.otp) {
          throw {
            statusCode: constants.code.preconditionFailed,
            msg: message.invalidOTP,
          };
        } else {
          OTP.findOneAndDelete({ email: data?.email })
            .then((data) => {
              res.status(constants.code.success).json({
                status: constants.status.statusTrue,
                userStatus: constants.userStatus.statusFalse,
                message: message.otpSuccess,
              });
            })
            .catch((err) => {
              res.status(constants.code.preconditionFailed).json({
                status: constants.status.statusFalse,
                userStatus: constants.userStatus.statusFalse,
                message: err,
              });
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
    res.status(constants.code.internalServerError).json({
      status: constants.status.statusFalse,
      userStatus: constants.userStatus.statusFalse,
      message: err,
    });
  }
};


export default {
  getAccessKey,
  sendOTP,
  verifyOTP,
};
