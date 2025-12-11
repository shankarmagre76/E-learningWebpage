// server/utils/uploadImage.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Debug logs (optional)
// console.log("Cloudinary loaded:", {
//   cloud: process.env.CLOUDINARY_CLOUD_NAME,
//   key: process.env.CLOUDINARY_API_KEY,
//   secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING"
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "elearning_thumbnails",
    format: async (req, file) => "jpg",
    public_id: (req, file) => Date.now(),
  },
});

// Multer middleware
const upload = multer({ storage });

export default upload;
