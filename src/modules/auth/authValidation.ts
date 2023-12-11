import { Request, Response, NextFunction } from "express";
import validator from "../../helpers/validator";
import constants from "../../utils/constants";
import { getMessage } from "../../helpers/helper";

const getAccessKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationRule = {
      access_token: "required|string",
    };
    const msg = {};
    await validator(
      req.body,
      validationRule,
      msg,
      async (err: any, status: boolean) => {
        if (!status) {
          res.status(constants.code.preconditionFailed).json({
            status: constants.status.statusFalse,
            userStatus: constants.userStatus.statusFalse,
            message: await getMessage(err),
          });
        } else {
          next();
        }
      }
    );
  } catch (err) {
    res.status(constants.code.preconditionFailed).json({
      status: constants.status.statusFalse,
      userStatus: constants.userStatus.statusFalse,
      message: err,
    });
  }
};

const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationRule = {
      email: "required|string|email",
    };
    const msg = {};
    await validator(
      req.body,
      validationRule,
      msg,
      async (err: any, status: boolean) => {
        if (!status) {
          res.status(constants.code.preconditionFailed).json({
            status: constants.status.statusFalse,
            userStatus: constants.userStatus.statusFalse,
            message: await getMessage(err),
          });
        } else {
          next();
        }
      }
    );
  } catch (err) {
    res.status(constants.code.preconditionFailed).json({
      status: constants.status.statusFalse,
      userStatus: constants.userStatus.statusFalse,
      message: err,
    });
  }
};

const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationRule = {
      email: "required|string|email",
      otp: "required|numeric|OTP",
    };
    const msg = {};
    await validator(
      req.body,
      validationRule,
      msg,
      async (err: any, status: boolean) => {
        if (!status) {
          res.status(constants.code.preconditionFailed).json({
            status: constants.status.statusFalse,
            userStatus: constants.userStatus.statusFalse,
            message: await getMessage(err),
          });
        } else {
          next();
        }
      }
    );
  } catch (err) {
    res.status(constants.code.preconditionFailed).json({
      status: constants.status.statusFalse,
      userStatus: constants.userStatus.statusFalse,
      message: err,
    });
  }
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationRule = {
      verify_token: "required|string",
    };
    const msg = {};
    await validator(
      req.body,
      validationRule,
      msg,
      async (err: any, status: boolean) => {
        if (!status) {
          res.status(constants.code.preconditionFailed).json({
            status: constants.status.statusFalse,
            userStatus: constants.userStatus.statusFalse,
            message: await getMessage(err),
          });
        } else {
          next();
        }
      }
    );
  } catch (err) {
    res.status(constants.code.preconditionFailed).json({
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
  verifyToken,
};
