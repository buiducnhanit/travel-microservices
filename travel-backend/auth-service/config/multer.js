const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "user_profile_images",
        allowed_formats: ["jpg", "png", "jpeg"],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
