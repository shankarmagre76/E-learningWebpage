// multer config for video/image
// server\utils\upload.js

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "elearning_videos",
    resource_type: "video",
  },
});

const uploadVideo = multer({ storage });

export default uploadVideo;
