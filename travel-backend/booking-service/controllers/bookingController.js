const bookingService = require("../services/bookingService");
const asyncHandler = require("express-async-handler");

exports.createBooking = asyncHandler(async (req, res) => {
    const { user, tour } = req.body;

    if (!tour) {
        return res.status(400).json({ message: "Tour ID is required" });
    }

    const booking = await bookingService.createBooking({ user, tour });
    res.status(201).json(booking);
});

exports.getUserBookings = asyncHandler(async (req, res) => {
    const bookings = await bookingService.getUserBookings(req.body.user);
    res.json(bookings);
});

exports.cancelBooking = asyncHandler(async (req, res) => {
    try {
        const booking = await bookingService.cancelBooking(req.params.bookingId, req.body.user);
        res.json({ message: "Booking cancelled successfully", booking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
