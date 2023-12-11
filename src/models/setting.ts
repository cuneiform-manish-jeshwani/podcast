import mongoose, { Schema, model } from "mongoose";
import { unixTime } from "../helpers/helper";

const settingSchema = new Schema(
  {
    webMaintenance: {
      time: { type: Date },
      status: { type: Boolean, default: false },
    },
    AccessKey: {
      type: String,
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: {} }
);

// settingSchema.method("getSettingDetail", async function getSettingDetail() {
//   return {
//     webMaintenance: {
//       status: this.webMaintenance.status,
//       time: await unixTime(this.webMaintenance.time),
//     },
//     createdAt: await unixTime(this.createdAt),
//     updatedAt: await unixTime(this.updatedAt),
//   };
// });

// settingSchema.method(
//   "getWebMaintenanceDetail",
//   async function getWebMaintenanceDetail() {
//     return {
//       status: this.webMaintenance.status,
//       time: await unixTime(this.webMaintenance.time),
//     };
//   }
// );

const Setting = model("setting", settingSchema);

Setting.exists({
  AccessKey: `adf47SNyv7d45adflrKul7a0OZahpd1fh2b85TQazXad0g5HiM5yAwsdvRt801`,
}).then((data) => {
  if (!data) {
    Setting.create({
      AccessKey: `adf47SNyv7d45adflrKul7a0OZahpd1fh2b85TQazXad0g5HiM5yAwsdvRt801`,
    });
  }
});

export default Setting;
