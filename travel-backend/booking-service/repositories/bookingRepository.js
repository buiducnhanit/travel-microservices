const Booking = require("../models/Booking");

exports.create = async (bookingData) => {
    return await Booking.create(bookingData);
};

exports.findById = async (bookingId) => {
    return await Booking.findById(bookingId);
};

exports.findByUserId = async (userId) => {
    return await Booking.find({ user: userId }).populate("tour");
};

exports.update = async (bookingId, updateData) => {
    return await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
};
