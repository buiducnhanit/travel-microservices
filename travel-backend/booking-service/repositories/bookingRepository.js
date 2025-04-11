const Booking = require("../models/Booking");

exports.create = async (bookingData) => {
    return await Booking.create(bookingData);
};

exports.findAll = async () => {
    return await Booking.find({ isDeleted: false });
};

exports.findById = async (bookingId) => {
    return await Booking.findById(bookingId);
};

exports.findByUserId = async (userId) => {
    return await Booking.find({ user: userId, isDeleted: false });
};

exports.update = async (bookingId, updateData) => {
    return await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
};

exports.delete = async (bookingId) => {
    return await Booking.findByIdAndUpdate(bookingId, { isDeleted: true }, { new: true });
};
