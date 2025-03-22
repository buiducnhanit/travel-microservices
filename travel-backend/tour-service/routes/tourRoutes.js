const express = require('express');
const router = express.Router();
const { createTour, getAllTours, getTourById, updateTour, deleteTour } = require("../controllers/tourController");
const upload = require("../config/multer");

router.get("/", getAllTours);
router.get("/:id", getTourById);
router.post("/", upload.any(), createTour);
router.put("/:id", upload.any(), updateTour);
router.delete("/:id", deleteTour);

module.exports = router;