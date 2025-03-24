const bookingRepository = require("../repositories/bookingRepository");

exports.createBooking = async (data) => {
    return await bookingRepository.create(data);
};

exports.getUserBookings = async (userId) => {
    return await bookingRepository.findByUserId(userId);
};

exports.cancelBooking = async (bookingId, userId) => {
    const booking = await bookingRepository.findById(bookingId);

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (booking.user.toString() !== userId) {
        throw new Error("Unauthorized to cancel this booking");
    }

    return await bookingRepository.update(bookingId, { status: "Cancelled" });
};
