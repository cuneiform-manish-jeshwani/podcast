import { Request, Response, NextFunction, response } from "express";
import validator from "../../helpers/validator";
import constants from "../../utils/constants";
import { getMessage } from "../../helpers/helper";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationRule = {
      first_name: "required|string|min:3",
      last_name: "required|string|min:3",
      email: "required|string|email|checkEmail",
      //password: "required|confirmed|checkPSW",
      phone: "string|min:10|checkPhone",
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
            userStatus: constants.status.statusFalse,
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

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationRule = {
      email: "required|string|email",
      password: "required|checkPSW",
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

const update = async (req: any, res: Response, next: NextFunction) => {
  try {
    const validationRule = {
      first_name: "required|string|min:3",
      last_name: "required|string|min:3",
      date_of_birth: "required|string",
      phone: "required|string",
      gender: "required|string|in:male,female,transgender",
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
            userStatus: req.status,
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
      userStatus: req.status,
      message: err,
    });
  }
};

const changeProfilePicture = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationRule = {};
    const msg = {};
    await validator(
      req.body,
      validationRule,
      msg,
      async (err: any, status: boolean) => {
        if (!status) {
          res.status(constants.code.preconditionFailed).json({
            status: constants.status.statusFalse,
            userStatus: req.status,
            message: await getMessage(err),
          });
        } else if (!req.file) {
          res.status(constants.code.preconditionFailed).json({
            status: constants.status.statusFalse,
            userStatus: req.status,
            message: constants.message.reqProfilePic,
          });
        } else {
          next();
        }
      }
    );
  } catch (err) {
    res.status(constants.code.preconditionFailed).json({
      status: constants.status.statusFalse,
      userStatus: req.status,
      message: err,
    });
  }
};

const changePassword = async (req: any, res: Response, next: NextFunction) => {
  const validationRule = {
    old_password: "required|string|checkPSW",
    new_password: "required|string|checkPSW|confirmed",
  };

  const msg = {};
  await validator(
    req.body,
    validationRule,
    msg,
    async (err: any, status: boolean) => {
      if (!status) {
        req.status(constants.code.preconditionFailed).json({
          status: constants.status.statusFalse,
          userStatus: req.status,
          message: await getMessage(err),
        });
      } else {
        next();
      }
    }
  );
};

const manageAuthentication = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationRule = {
      is_2FA: "required|boolean|in:true,false",
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
            userStatus: req.status,
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
      userStatus: req.status,
      message: err,
    });
  }
};
export default {
  register,
  login,
  changeProfilePicture,
  update,
  changePassword,
  manageAuthentication,
  // resetPassword,
  // manageAccount,
  // deleteAccount,
};
