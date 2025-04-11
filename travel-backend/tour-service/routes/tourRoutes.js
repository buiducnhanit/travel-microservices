const express = require('express');
const router = express.Router();
const { createTour, getAllTours, getTourById, updateTour, deleteTour, searchTours, updateTourSlots } = require("../controllers/tourController");
const upload = require("../config/multer");

router.get("/", getAllTours);
router.get("/search", searchTours);
router.get("/:id", getTourById);
router.post("/", upload.any(), createTour);
router.put("/:id", upload.any(), updateTour);
router.delete("/:id", deleteTour);
router.patch('/:id', updateTourSlots);

module.exports = router;