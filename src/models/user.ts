import mongoose, { Schema, model } from "mongoose";
import constants from "../utils/constants";
import { unixTime, getUsername, hashPassword } from "../helpers/helper";

const userSchema = new Schema(
  {
    profilePicture: { type: String },
    profilePictureUrl: { type: String },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String},
    password: { type: String, required: true },
    gender: { type: String },
    dob: { type: Date },
    status: { type: Boolean, required: true, default: true },
    verifyToken: { type: String },
    isDeleted: { type: Boolean, required: true, default: false },
    is_2FA: {
      type: Boolean,
      default: false,
    },
    is_verify: {
      type: Boolean,
      default: false,
    },
    registrationVia: {
      type: String,
      enum: [
        constants.registrationType.google,
        constants.registrationType.normal,
      ],
      default: constants.registrationType.normal,
    },
    role: {
      type: Number,
      enum: [
        constants.accountLevel.superAdmin,
        constants.accountLevel.admin,
        constants.accountLevel.user,
      ],
      default: constants.accountLevel.user,
    },
    privileges: {
      type: Map,
      of: Array,
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: {} }
);

userSchema.method("getUserDetail", async function getUserDetail(this:any) {
  return {
    _id: this._id,
    profilePicture: this.profilePicture,
    profilePictureUrl: this.profilePictureUrl,
    fname: this.fname,
    lname: this.lname,
    email: this.email,
    username: this.username,
    gender: this.gender,
    dob: await unixTime(this.dob),
    phone: this.phone,
    role: this.role,
    is_2FA: this.is_2FA,
    is_verify: this.is_verify,
    privileges: this.privileges,
    status: this.status,
    isDeleted: this.isDeleted,
    createdBy: this.createdBy,
    updatedBy: this.updatedBy,
    deletedBy: this.deletedBy,
    createdAt: await unixTime(this.createdAt),
    updatedAt: await unixTime(this.updatedAt),
  };
});

userSchema.method("getAuthDetail", async function getAuthDetail() {
  return {
    role: this.role,
    is_2FA: this.is_2FA,
    is_verify: this.is_verify,
    privileges: this.privileges,
  };
});

const User = model("user", userSchema);

User.exists({
  email: `super@gmail.com`,
}).then(async (data) => {
  if (!data) {
    await User.create({
      fname: "Super",
      lname: "Admin",
      username: await getUsername("super@gmail.com"),
      email: `super@gmail.com`,
      password: await hashPassword("Super@1234"),
      phone: "+910101010101",
      role: constants.accountLevel.superAdmin,
      privileges: [
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
      ],
    })
      .then((data) => {
        console.log(constants.message.superAdmin);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

export default User;
