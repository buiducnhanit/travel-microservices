const bookingService = require("../services/bookingService");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const { API_GATEWAY_URL } = require("../config/env");

exports.createBooking = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    const { user, tour, fullName, email, phone, people, notes } = req.body;

    if (!tour) {
        return res.status(400).json({ message: "Tour ID is required" });
    }

    try {
        const tourResponse = await axios.get(`${API_GATEWAY_URL}/api/tours/${tour}`);
        const tourData = tourResponse.data;

        const savedBooking = await bookingService.createBooking(token , user, tourData, fullName, email, phone, people, notes);

        res.status(201).json({
            message: "Đặt tour thành công, email xác nhận đã được gửi!",
            booking: savedBooking,
        });
    } catch (error) {
        console.error("Error in booking creation:", error.message);
        res.status(500).json({ message: "Có lỗi xảy ra khi tạo booking", error: error.message });
    }
});

exports.getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
});

exports.getBookingById = asyncHandler(async (req, res) => {
    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
});

exports.getUserBookings = asyncHandler(async (req, res) => {
    const bookings = await bookingService.getUserBookings(req.body.user);
    res.json(bookings);
});

exports.updateBooking = asyncHandler(async (req, res) => {
    try {
        const updatedBooking = await bookingService.updateBooking(req.params.id, req.body);
        res.json({ message: "Booking updated successfully", updatedBooking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

exports.deleteBooking = asyncHandler(async (req, res) => {
    try {
        await bookingService.deleteBooking(req.params.id);
        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

exports.cancelBooking = asyncHandler(async (req, res) => {
    try {
        const booking = await bookingService.cancelBooking(req.params.id, req.body.user);
        res.json({ message: "Booking cancelled successfully", booking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
