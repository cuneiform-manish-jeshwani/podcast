import { Request, Response, NextFunction } from "express";
import validator from "../../../helpers/validator";
import constants from "../../../utils/constants";
import { getMessage } from "../../../helpers/helper";

const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const validationRule = {
      first_name: "required|string|min:3",
      last_name: "required|string|min:3",
      email: "required|string|email|checkEmail",
      phone: "required|string|min:5|checkPhone",
      gender: "required|string|in:male,female,transgender",
      date_of_birth: "required|string",
      role: `required|numeric|in:${constants.accountLevel.admin},${constants.accountLevel.user}`,
      privileges: "required|array|checkPrivileges",
    };
    const msg = {
      "array.privileges": "The privileges must be an map object.",
    };

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
  create,

};
