const express = require("express");
const { register, login, getMe, getAllUsers, updateUser, deleteUser } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
