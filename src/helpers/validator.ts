import Validator from "validatorjs";
import User from "../models/user";
import constants from "../utils/constants";

const validator = async (
  body: any,
  rules: any,
  customMessages: any,
  callback: any
) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

Validator.register(
  "OTP",
  (value: any) => value.toString().length === 6,
  "OTP length should be 6 digits."
);

let regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
Validator.register(
  "checkPSW",
  (value: any) => regex.test(value) === true,
  "Invalid password."
);

Validator.registerAsync(
  "checkEmail",
  async function (value, attribute, req, passes) {
    const emailExists = await User.exists({ email: value });
    if (!emailExists) {
      passes();
    } else {
      passes(false, "Email already taken.");
    }
  },
  ""
);

Validator.registerAsync(
  "checkPhone",
  async function (value, attribute, req, passes) {
    const phoneExists = await User.exists({ phone: value });
    // if (value.toString().length !== 10) {
    //   passes(false, "Phone number must be 10 digits.");
    // }
    if (!phoneExists) {
      passes();
    } else {
      passes(false, "Phone already taken.");
    }
  },
  ""
);

Validator.registerAsync(
  "checkPrivileges",
  async function (value: any, attribute, req, passes) {
    const privileges: any = new Map([
      [
        constants.privileges.user_management,
        [
          constants.rights.read,
          constants.rights.write,
          constants.rights.delete,
        ],
      ],
      [
        constants.privileges.email_management,
        [
          constants.rights.read,
          constants.rights.write,
          constants.rights.delete,
        ],
      ],
      [
        constants.privileges.cms_management,
        [
          constants.rights.read,
          constants.rights.write,
          constants.rights.delete,
        ],
      ],
      [
        constants.privileges.configuration_management,
        [
          constants.rights.read,
          constants.rights.write,
          constants.rights.delete,
        ],
      ],
    ]);

    const data: any = new Map(value);

    const compareMap = (privileges: any, data: any) => {
      for (const [key, value] of data) {
        if (!privileges.has(key)) {
          passes(false, `The selected privilege ${key} is invalid.`);
          return;
        } else {
          for (let i = 0; i < value.length; i++) {
            if (!privileges.get(key).includes(value[i])) {
              passes(
                false,
                `The selected right ${value[i]} is invalid in privilage ${key}.`
              );
              return;
            }
          }
        }
      }
      passes();
    };

    compareMap(privileges, data);
  },
  ""
);Validator.registerAsync(
  "checkTime",
  async function (value, attribute, req, passes) {
    const date = new Date();
    if (value < date.toISOString()) {
      passes(false, "Time should be greater than current time.");
    } else {
      passes();
    }
  },
  ""
);

export default validator;
