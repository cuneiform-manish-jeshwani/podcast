import { hashSync, compareSync } from "bcrypt";
import CryptoJS from 'crypto-js'
import { unlinkSync } from "fs";

const getMessage = async (msg: any) => {
  const errMsg: any = Object.values(msg.errors)[0];
  return errMsg[0];
};

const randomNumber = async () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return num;
};

const minutes = async (time: string) => {
  const prevTime = new Date(time).getTime();
  const curnTime = new Date().getTime();
  const minutes = Math.round((curnTime - prevTime) / 1000 / 60);
  return minutes;
};

const unixTime = async (date: string) => {
  return new Date(date).getTime();
};

const getUsername = async (email: string) => {
  return email.split("@")[0];
};

const hashPassword = async (password: string) => {
  const saltRounds = 15;
  return hashSync(password, saltRounds);
};

const checkPassword = async (password: string, hash: string) => {
  return compareSync(password, hash);
};

const randomKey = async () => {
  const str = Array.from({ length: 64 }, () =>
    "0123456789abcdef".charAt(Math.floor(Math.random() * 16))
  ).join("");
  const key = CryptoJS.enc.Hex.parse(str);
  return key;
};

const randomiv = async () => {
  const str = Array.from({ length: 32 }, () =>
    "0123456789abcdef".charAt(Math.floor(Math.random() * 16))
  ).join("");
  const iv = CryptoJS.enc.Hex.parse(str);
  return iv;
};

const randomToken = async () => {
  const str = Array.from({ length: 48 }, () =>
    "0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ".charAt(
      Math.floor(Math.random() * 62)
    )
  ).join("");

  return str;
};

const toLowerCase = async (text: string) => {
  return text.toLowerCase();
};

const getFileName = async (fileUrl: string) => {
  let index = fileUrl.lastIndexOf("/") + 1;
  let filename = fileUrl.substring(index);
  return filename;
};

const fileUrl = async (host: string, filename: string) => {
  return `http://${host}/files/${filename}`;
};

const photoUrl = async (host: string, filename: string) => {
  return `http://${host}/photos/${filename}`;
};

const imageUrl = async (host: string, filename: string) => {
  return `http://${host}/images/${filename}`;
};

const removeFile = async (filename: string) => {
  return unlinkSync(`public/files/${filename}`);
};

const removePhoto = async (filename: string) => {
  return unlinkSync(`public/photos/${filename}`);
};

const removeImage = async (filename: any) => {
  return unlinkSync(`public/images/${filename}`);
};

const createSlug = async (title: string) => {
  let slug = title.toLowerCase();
  slug = slug.replace(/[^a-z0-9\-_\s]/g, ""); // Remove non-alphanumeric characters
  slug = slug.replace(/\s+/g, "-"); // Replace spaces with hyphens
  slug = slug.replace(/[-_]+/g, "-"); // Remove  hyphens and underscores
  slug = slug.replace(/^-+|-+$/g, ""); //  Remove leading and trailing hyphens and underscores
  return slug;
};

const createPassword = async (name: any, dob: any) => {
  const newName = name.charAt(0).toUpperCase() + name.slice(1);
  const date = new Date(dob);
  const year = date.getFullYear();
  return `${newName}@${year}`;
};

const isDateValid = async (date: any) => {
  const newDate: any = new Date(date);
  return !isNaN(newDate);
};

export {
  getMessage,
  randomNumber,
  minutes,
  unixTime,
  getUsername,
  hashPassword,
  randomKey,
  randomiv,
  randomToken,
  toLowerCase,
  checkPassword,
  getFileName,
  fileUrl,
  photoUrl,
  imageUrl,
  removeFile,
  removePhoto,
  removeImage,
  createSlug,
  createPassword,
  isDateValid,
};
