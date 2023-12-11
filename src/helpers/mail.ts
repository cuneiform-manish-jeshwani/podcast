import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { readFileSync, writeFileSync } from "fs";
import { createSlug } from "./helper";
import Email from "../models/email";
import constants from "../utils/constants";

const generateHtml = async (data: any) => {
  try {
    const context = {
      body: data,
    };
    const content = readFileSync("public/templates/mail.html", "utf8");
    const template = Handlebars.compile(content);
    return template(context);
  } catch (err) {
    console.log(err);
  }
};

const addPayload = async (data: any, payload: any) => {
  try {
    const context = {
      payload: payload,
    };

    const template = Handlebars.compile(await generateHtml(data));
    return template(context);
  } catch (err) {
    console.log(err);
  }
};

const sendMail = async (payload: any) => {
 
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4a808bf2837def",
      pass: "2bcf0904fefabb"
    }
  });

  Email.findOne({
    slug: await createSlug(payload.title),
  })
    .then(async (data: any) => {
      if (!data) {
        constants.message.dataNotFound;
      } else {
        const mailOptions = {
          from: `Podcast ${process.env.SMTP_USER}`,
          to: payload?.to,
          subject: data?.subject,
          html: await addPayload(data.body, payload.data),
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
        
            return true;
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default sendMail;
