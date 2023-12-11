import mongoose, { Schema, model } from "mongoose";
import { createSlug, unixTime } from "../helpers/helper";

const emailSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

emailSchema.method("getEmailDetail", async function getEmailDetail(this:any) {
  return {
    _id: this._id,
    title: this.title,
    slug: this.slug,
    subject: this.subject,
    body: this.body,
    createdBy: this.createdBy,
    updatedBy: this.updatedBy,
    deletedBy: this.deletedBy,
    createdAt: await unixTime(this.createdAt),
    updatedAt: await unixTime(this.updatedAt),
  };
});

const Email = model("email", emailSchema);

const templates = [
  {
    title: "Send OTP",
    subject: "One Time Password | Podcast",
    body: `<table
    cellpadding="0"
    cellspacing="0"
    class="es-content"
    align="center"
    style="
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
      border-spacing: 0px;
      table-layout: fixed !important;
      width: 100%;
    "
  >
    <tr>
      <td align="center" style="padding: 0; margin: 0">
        <table
          bgcolor="#ffffff"
          class="es-content-body"
          align="center"
          cellpadding="0"
          cellspacing="0"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            background-color: #fad939;
            border-radius: 0 0 50px 50px;
            width: 510px;
          "
        >
          <tr>
            <td
              align="left"
              style="
                padding: 0;
                margin: 0;
                padding-left: 20px;
                padding-right: 20px;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="padding: 0; margin: 0; width: 470px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="padding: 0; margin: 0"
                        >
                          <h1
                            style="
                              margin: 0;
                              line-height: 46px;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              font-size: 38px;
                              font-style: normal;
                              font-weight: bold;
                              color: #5d541d;
                            "
                          >
                            OTP<br />Verification
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="
                            padding: 0;
                            margin: 0;
                            padding-top: 40px;
                            padding-bottom: 40px;
                          "
                        >
                          <h3
                            style="
                              margin: 0;
                              line-height: 24px;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              font-size: 20px;
                              font-style: normal;
                              font-weight: bold;
                              color: #5d541d;
                            "
                          >
                            Thanks for joining Brandindoor!
                          </h3>
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              line-height: 27px;
                              color: #5d541d;
                              font-size: 18px;
                            "
                          >
                            <br />
                          </p>
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              line-height: 27px;
                              color: #5d541d;
                              font-size: 18px;
                            "
                          >
                            Use the following OTP to complete the
                            authentication procedure. OTP is valid for
                            5 minutes.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="padding: 0; margin: 0"
                        >
                          <span
                            class="msohide es-button-border"
                            style="
                              border-style: solid;
                              border-color: #2cb543;
                              background: #8928c6;
                              border-width: 0px;
                              display: inline-block;
                              border-radius: 30px;
                              width: auto;
                              mso-hide: all;
                            "
                          >
                            <span
                              style="
                                mso-style-priority: 100 !important;
                                text-decoration: none;
                                -webkit-text-size-adjust: none;
                                -ms-text-size-adjust: none;
                                mso-line-height-rule: exactly;
                                color: #ffffff;
                                font-size: 16px;
                                padding: 15px 35px 15px 35px;
                                display: inline-block;
                                background: #8928c6;
                                border-radius: 30px;
                                font-family: Poppins, sans-serif;
                                font-weight: normal;
                                font-style: normal;
                                line-height: 19px;
                                width: auto;
                                text-align: center;
                                mso-padding-alt: 0;
                              "
                            >
                              {{payload}}
                            </span> </span
                          ><!--<![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              align="left"
              style="
                margin: 0;
                padding-top: 20px;
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 40px;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="left"
                    style="padding: 0; margin: 0; width: 470px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="padding: 0; margin: 0"
                        >
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              line-height: 21px;
                              color: #5d541d;
                              font-size: 14px;
                            "
                          >
                            Thanks,<br />Brandindoor Team!&nbsp;
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
          </table>`,
  },
  {
    title: "Reset Password",
    subject: "Reset Password | Podcast",
    body: ` <table
    cellpadding="0"
    cellspacing="0"
    class="es-content"
    align="center"
    style="
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
      border-spacing: 0px;
      table-layout: fixed !important;
      width: 100%;
    "
  >
    <tr>
      <td align="center" style="padding: 0; margin: 0">
        <table
          bgcolor="#ffffff"
          class="es-content-body"
          align="center"
          cellpadding="0"
          cellspacing="0"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            background-color: #fad939;
            border-radius: 0 0 50px 50px;
            width: 510px;
          "
        >
          <tr>
            <td
              align="left"
              style="
                padding: 0;
                margin: 0;
                padding-left: 20px;
                padding-right: 20px;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="padding: 0; margin: 0; width: 470px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="padding: 0; margin: 0"
                        >
                          <h1
                            style="
                              margin: 0;
                              line-height: 46px;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              font-size: 38px;
                              font-style: normal;
                              font-weight: bold;
                              color: #5d541d;
                            "
                          >
                            Password Change<br />Request
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="
                            padding: 0;
                            margin: 0;
                            padding-top: 40px;
                            padding-bottom: 40px;
                          "
                        >
                          <h3
                            style="
                              margin: 0;
                              line-height: 24px;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              font-size: 20px;
                              font-style: normal;
                              font-weight: bold;
                              color: #5d541d;
                            "
                          >
                            You have submitted a password change
                            request.
                          </h3>
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              line-height: 27px;
                              color: #5d541d;
                              font-size: 18px;
                            "
                          >
                            <br />
                          </p>
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              line-height: 27px;
                              color: #5d541d;
                              font-size: 18px;
                            "
                          >
                            A unique link to reset your password has
                            been generated for you. To reset your
                            password, click the following link and
                            follow the instructions.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="padding: 0; margin: 0"
                        >
                          <span
                            class="msohide es-button-border"
                            style="
                              border-style: solid;
                              border-color: #2cb543;
                              background: #8928c6;
                              border-width: 0px;
                              display: inline-block;
                              border-radius: 30px;
                              width: auto;
                              mso-hide: all;
                            "
                            ><a
                              href="{{payload}}"
                              class="es-button"
                              target="_blank"
                              style="
                                mso-style-priority: 100 !important;
                                text-decoration: none;
                                -webkit-text-size-adjust: none;
                                -ms-text-size-adjust: none;
                                mso-line-height-rule: exactly;
                                color: #ffffff;
                                font-size: 16px;
                                padding: 15px 35px 15px 35px;
                                display: inline-block;
                                background: #8928c6;
                                border-radius: 30px;
                                font-family: Poppins, sans-serif;
                                font-weight: normal;
                                font-style: normal;
                                line-height: 19px;
                                width: auto;
                                text-align: center;
                                mso-padding-alt: 0;
                                mso-border-alt: 10px solid #8928c6;
                              "
                              >Reset Password</a
                            ></span
                          ><!--<![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              align="left"
              style="
                margin: 0;
                padding-top: 20px;
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 40px;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="left"
                    style="padding: 0; margin: 0; width: 470px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="padding: 0; margin: 0"
                        >
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              line-height: 21px;
                              color: #5d541d;
                              font-size: 14px;
                            "
                          >
                            Thanks,<br />Brandindoor Team!&nbsp;
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`,
  },
  {
    title: "Credential",
    subject: "Your Credentials | Podcast",
    body: `
    <table
    cellpadding="0"
    cellspacing="0"
    class="es-content"
    align="center"
    style="
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
      border-spacing: 0px;
      table-layout: fixed !important;
      width: 100%;
    "
  >
    <tr>
      <td align="center" style="padding: 0; margin: 0">
        <table
          bgcolor="#ffffff"
          class="es-content-body"
          align="center"
          cellpadding="0"
          cellspacing="0"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            background-color: #fad939;
            border-radius: 0 0 50px 50px;
            width: 510px;
          "
        >
          <tr>
            <td
              align="left"
              style="
                padding: 0;
                margin: 0;
                padding-left: 20px;
                padding-right: 20px;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="padding: 0; margin: 0; width: 470px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="padding: 0; margin: 0"
                        >
                          <h1
                            style="
                              margin: 0;
                              line-height: 46px;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              font-size: 38px;
                              font-style: normal;
                              font-weight: bold;
                              color: #5d541d;
                            "
                          >
                            Hello, {{payload?.fname}}<br />{{payload}}
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="
                            padding: 0;
                            margin: 0;
                            padding-top: 40px;
                            padding-bottom: 40px;
                          "
                        >
                          <h3
                            style="
                              margin: 0;
                              line-height: 24px;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              font-size: 20px;
                              font-style: normal;
                              font-weight: bold;
                              color: #5d541d;
                            "
                          >
                          Greetings from Brandindoor!
                          </h3>
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              line-height: 27px;
                              color: #5d541d;
                              font-size: 18px;
                            "
                          >
                            <br />
                          </p>
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              line-height: 27px;
                              color: #5d541d;
                              font-size: 18px;
                            "
                          >
                          Your account has been created successfully.
                          <table style="margin-top: 10px; font-family: Poppins, sans-serif;color: #5d541d; ">
                           <tr>
                             <th style="text-align: right; vertical-align: top;">Username/Email:</th>
                             <td>{{payload}}</td>
                           </tr>
                           <tr>
                             <th style="text-align: right; vertical-align: top;">Password:</th>
                             <td style="font-weight: lighter;">Your account password is your First name's initial which will be in Capital followed by @ and your Birth year. (Ex. John@1989 )</td>
                           </tr>
                          </table>
                          </p>
                        </td>
                      </tr>
                     
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              align="left"
              style="
                margin: 0;
                padding-top: 20px;
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 40px;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="left"
                    style="padding: 0; margin: 0; width: 470px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="padding: 0; margin: 0"
                        >
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: Poppins, sans-serif;
                              line-height: 21px;
                              color: #5d541d;
                              font-size: 14px;
                            "
                          >
                            Thanks,<br />Brandindoor Team!&nbsp;
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
    `,
  },
];

const customTemplates = async () => {
  for (let i = 0; i < templates.length; i++) {
    Email.exists({
      slug: await createSlug(templates[i].title),
    })
      .then(async (data) => {
        if (data) {
          return;
        } else {
          await Email.create({
            title: templates[i].title,
            slug: await createSlug(templates[i].title),
            subject: templates[i].subject,
            body: templates[i].body,
          })
            .then((data) => {})
            .catch((err: any) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

customTemplates();

export default Email;
