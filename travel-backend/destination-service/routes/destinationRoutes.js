const express = require("express");
const router = express.Router();
const { getAllDestinations, getDestinationById, createDestination, updateDestination, deleteDestination } = require("../controllers/destinationController");
const upload = require('../config/multer');

router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);
router.post("/", upload.any(), createDestination);
router.put("/:id", upload.any(), updateDestination);
router.delete("/:id", deleteDestination);

module.exports = router;
