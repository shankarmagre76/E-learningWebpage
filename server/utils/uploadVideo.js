import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "elearning/lessons",
    resource_type: "video", // IMPORTANT
    allowed_formats: ["mp4", "mov", "avi", "mkv"],
  },
});

export default videoStorage;
