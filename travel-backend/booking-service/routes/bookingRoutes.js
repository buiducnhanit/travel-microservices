const express = require("express");
const { getAllBookings, getBookingById, createBooking, getUserBookings, deleteBooking, cancelBooking, updateBooking } = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.post("/history-booking", getUserBookings);
router.delete("/:id", deleteBooking);
router.put("/:id/cancel", cancelBooking);

module.exports = router;
    