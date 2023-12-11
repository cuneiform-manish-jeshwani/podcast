import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import constants from "../../utils/constants";
import {
  checkPassword,
  getFileName,
  getUsername,
  hashPassword,
  photoUrl,
  removePhoto,
  toLowerCase,
} from "../../helpers/helper";
import message from "./userConstant";
import sendMail from "../../helpers/mail";
import { createToken, deleteAllToken, deleteToken } from "../../helpers/token";
import mongoose from "mongoose";

const register = async (req: any, res: Response) => {
  try {
    User.create({
      fname: req.body.first_name,
      lname: req.body.last_name,
      email: await toLowerCase(req.body.email),
      password: await hashPassword(req.body.password),
      username: await getUsername(req.body.email),
      role: constants.accountLevel.user,
    })
      .then(async (data) => {
        if (!data) {
          throw {
            statusCode: constants.code.dataNotFound,
            msg: constants.message.dataNotFound,
          };
        } else {
          res.status(constants.code.success).json({
            status: constants.status.statusTrue,
            userStatus: constants.userStatus.statusTrue,
            message: message.userAddSuccess,
          });
        }
      })
      .catch((err) => {
        res.status(constants.code.preconditionFailed).json({
          status: constants.status.statusFalse,
          userStatus: constants.userStatus.statusFalse,
          message: err,
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

const login = async (req: Request, res: Response) => {
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
        ) 
        
        {
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
        } else if (data.role !== constants.accountLevel.user) {
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

const detail = async (req: any, res: Response, next: NextFunction) => {
  try {
    User.findOne({
      _id: new mongoose.Types.ObjectId(req.id),
      role: constants.accountLevel.user,
      status: true,
      isDeleted: false,
    })
      .then(async (data: any) => {
        if (!data) {
          throw {
            statusCode: constants.code.dataNotFound,
            msg: constants.message.dataNotFound,
          };
        } else {
          res.status(constants.code.success).json({
            status: constants.status.statusTrue,
            userStatus: req.status,
            message: constants.message.userDetail,
            data: await data.getUserDetail(),
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

const updateDetail = async (req: any, res: Response, next: NextFunction) => {
  try {
    User.exists({
      phone: req.body.phone,
      _id: { $nin: [new mongoose.Types.ObjectId(req.id)] },
    })
      .then(async (data) => {
        if (data) {
          throw {
            statusCode: constants.code.preconditionFailed,
            msg: constants.message.phoneTaken,
          };
        } else {
          User.findOneAndUpdate(
            {
              _id: new mongoose.Types.ObjectId(req.id),
              role: constants.accountLevel.user,
              status: true,
              isDeleted: false,
            },
            {
              fname: req.body.first_name,
              lname: req.body.last_name,
              phone: req.body.phone,
              gender: req.body.gender,
              dob: req.body.date_of_birth,
            },
            { new: true }
          )
            .then(async (data: any) => {
              if (!data) {
                throw {
                  statusCode: constants.code.dataNotFound,
                  msg: constants.message.dataNotFound,
                };
              } else {
                res.status(constants.code.success).json({
                  status: constants.status.statusTrue,
                  userStatus: req.status,
                  message: constants.message.userUpdate,
                  data: await data.getUserDetail(),
                });
              }
            })
            .catch((err) => {
              res.status(constants.code.internalServerError).json({
                status: constants.status.statusFalse,
                userStatus: req.status,
                message: err.msg,
              });
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

const changeProfilePicture = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    User.findOne({
      _id: new mongoose.Types.ObjectId(req.id),
      role: constants.accountLevel.user,
      status: true,
      isDeleted: false,
    })
      .then(async (data) => {
        if (!data) {
          throw {
            statusCode: constants.code.dataNotFound,
            msg: constants.message.dataNotFound,
          };
        } else if (!data.profilePicture) {
          User.findOneAndUpdate(
            {
              _id: new mongoose.Types.ObjectId(req.id),
              role: constants.accountLevel.user,
              status: true,
              isDeleted: false,
            },
            {
              profilePicture: await photoUrl(
                req.headers.host,
                req.file.filename
              ),
            },
            { new: true }
          )
            .then((data) => {
              if (!data) {
                throw {
                  statusCode: constants.code.dataNotFound,
                  msg: constants.message.dataNotFound,
                };
              } else {
                res.status(constants.code.success).json({
                  status: constants.status.statusTrue,
                  userStatus: req.status,
                  message: constants.message.profileSuccess,
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
        } else {
          await removePhoto(await getFileName(data.profilePicture));
          User.findOneAndUpdate(
            {
              _id: new mongoose.Types.ObjectId(req.id),
              role: constants.accountLevel.user,
              status: true,
              isDeleted: false,
            },
            {
              profilePicture: await photoUrl(
                req.headers.host,
                req.file.filename
              ),
            },
            { new: true }
          )
            .then((data) => {
              if (!data) {
                throw {
                  statusCode: constants.code.dataNotFound,
                  msg: constants.message.dataNotFound,
                };
              } else {
                res.status(constants.code.success).json({
                  status: constants.status.statusTrue,
                  userStatus: req.status,
                  message: constants.message.profileSuccess,
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
  register,
  login,
   detail,
   updateDetail,
   changeProfilePicture,
};