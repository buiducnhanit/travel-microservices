const express = require("express");
const { register, login, getMe, getAllUsers, getUserById, updateUser, deleteUser, updateProfileImage, forgotPassword, changePassword } = require("../controllers/authController");
const router = express.Router();
const upload = require("../config/multer");

router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.put(
    "/update-profile-image",
    upload.single("avatar"),
    (req, res, next) => {
        console.log("🔵 Route update-profile-image được gọi!");
        next();
    },
    updateProfileImage
);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);

module.exports = router;
