import mongoose, { Schema, model } from "mongoose";
import { createSlug, unixTime } from "../helpers/user";

const cmsSchema = new Schema(
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
    description: {
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

cmsSchema.method("getCmsDetail", async function getCmsDetail() {
  return {
    _id: this._id,
    title: this.title,
    slug: this.slug,
    description: this.description,
    createdBy: this.createdBy,
    updatedBy: this.updatedBy,
    deletedBy: this.deletedBy,
    
  };
});

const CMS = model("cms", cmsSchema);

const pages = [
  {
    title: "Terms & Condition",
    description: "<p>lorem ipsum text</p>",
  },
  {
    title: "Privacy Policy",
    description: "<p>lorem ipsum text</p>",
  },
];

const customPages = async () => {
  for (let i = 0; i < pages.length; i++) {
    CMS.exists({
      slug: await createSlug(pages[i].title),
    })
      .then(async (data) => {
        if (data) {
          return;
        } else {
          await CMS.create({
            title: pages[i].title,
            slug: await createSlug(pages[i].title),
            description: pages[i].description,
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

customPages();

export default CMS;
