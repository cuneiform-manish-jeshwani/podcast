import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import constants from "../../../utils/constants";
import Email from "../../../models/email";
import { createSlug } from "../../../helpers/helper";
import message from "./emailConstant";

const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    Email.exists({
      slug: await createSlug(req.body.title),
    })
      .then(async (data) => {
        if (data) {
          throw {
            statusCode: constants.code.notAcceptable,
            msg: message.alreadyExist,
          };
        } else {
          Email.create({
            title: req.body.title,
            slug: await createSlug(req.body.title),
            subject: req.body.subject,
            body: req.body.body,
            createdBy: req.id,
          })
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
                  message: message.emailSuccess,
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




const detail = async (req: any, res: Response, next: NextFunction) => {
    try {
      Email.findOne({
        slug: req.params.slug,
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
              message: message.emailDetailSuccess,
              data: await data.getEmailDetail(),
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
  

  const update = async (req: any, res: Response, next: NextFunction) => {
    try {
      Email.exists({
        slug: req.params.slug,
        isDeleted: false,
      })
        .then(async (data) => {
          if (!data) {
            throw {
              statusCode: constants.code.dataNotFound,
              msg: constants.message.dataNotFound,
            };
          } else {
            Email.exists({
              $and: [
                { slug: await createSlug(req.body.title) },
                { slug: { $nin: [req.params.slug] } },
              ],
            })
              .then(async (data: any) => {
                if (data) {
                  throw {
                    statusCode: constants.code.notAcceptable,
                    msg: message.alreadyExist,
                  };
                } else {
                  Email.findOneAndUpdate(
                    {
                      slug: req.params.slug,
                    },
                    {
                      title: req.body.title,
                      slug: await createSlug(req.body.title),
                      subject: req.body.subject,
                      body: req.body.body,
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
                          message: message.emailUpdateSuccess,
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

  const deleteEmail = async (req: any, res: Response, next: NextFunction) => {
    try {
      if (!req.body.is_delete) {
        throw {
          statusCode: constants.code.preconditionFailed,
          msg: constants.message.invalidType,
        };
      } else {
        Email.findOneAndUpdate(
          {
            slug: req.params.slug,
            isDeleted: false,
          },
          {
            isDeleted: req.body.is_delete,
          }
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
                message: message.emailDeleted,
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
    } catch (err: any) {
      res.status(err.statusCode).json({
        status: constants.status.statusFalse,
        userStatus: req.status,
        message: err.msg,
      });
    }
  };





export default{
    create,
    detail,
    update,
    deleteEmail
}