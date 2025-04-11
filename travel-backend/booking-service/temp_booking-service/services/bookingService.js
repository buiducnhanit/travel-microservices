const bookingRepository = require("../repositories/bookingRepository");
const { API_GATEWAY_URL } = require("../config/env");
const axios = require("axios");
const { sendMail } = require("../config/emailService");
const Booking = require("../models/Booking");

exports.createBooking = async (token, user, tour, fullName, email, phone, people, notes) => {
    try {
        if (tour.availableSlots < people) {
            throw new Error("Không đủ số lượng slot cho tour này");
        }
        const totalPrice = tour.price * people;

        const newBooking = new Booking({
            user: user,
            tour: tour._id,
            fullName,
            email,
            phone,
            people,
            notes,
            totalPrice,
            paymentStatus: "Unpaid",
        });

        const mailOptions = {
            from: "your-email@gmail.com",
            to: email,
            subject: `Xác nhận đặt tour ${tour.name}`,
            text: `
                Xin chào ${fullName},
                
                Cảm ơn bạn đã đặt tour "${tour.name}"! Đây là thông tin booking của bạn:
                - Email: ${email}
                - Điện thoại: ${phone}
                - Số người: ${people}
                - Giá tour: ${tour.price} x ${people} = ${totalPrice} VND
                - Ghi chú: ${notes || "Không có ghi chú"}
    
                Chúng tôi sẽ liên hệ lại với bạn để xác nhận thanh toán.
                
                Trân trọng,
                Team Tour Service
            `,
        };

        await sendMail(mailOptions);

        await axios.patch(`${API_GATEWAY_URL}/api/tours/${tour._id}`, {
            availableSlots: tour.availableSlots - people
        }, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return await newBooking.save();
    } catch (error) {
        console.error("Error creating booking:", error.message);
        throw new Error(error.message);
    }
};

exports.getAllBookings = async () => {
    const bookings = await bookingRepository.findAll();

    const bookingDetails = await Promise.all(
        bookings.map(async (booking) => {
            let userDetails = null;
            let tourDetails = null;

            try {
                const userResponse = await axios.get(`${API_GATEWAY_URL}/api/auth/users/${booking.user}`);
                userDetails = userResponse.data;
            } catch (error) {
                console.error(`Failed to fetch user: ${booking.user}`);
            }

            try {
                const tourResponse = await axios.get(`${API_GATEWAY_URL}/api/tours/${booking.tour}`);
                tourDetails = tourResponse.data;
            } catch (error) {
                console.error(`Failed to fetch tour: ${booking.tour}`);
            }

            return {
                ...booking.toObject(),
                userDetails,
                tourDetails,
            };
        })
    );

    return bookingDetails;
};

exports.getBookingById = async (bookingId) => {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) return null;

    let userDetails = null;
    let tourDetails = null;

    try {
        const userResponse = await axios.get(`${API_GATEWAY_URL}/api/auth/users/${booking.user}`);
        userDetails = userResponse.data;
    } catch (error) {
        console.error(`Failed to fetch user: ${booking.user}`);
    }

    try {
        const tourResponse = await axios.get(`${API_GATEWAY_URL}/api/tours/${booking.tour}`);
        tourDetails = tourResponse.data;
    } catch (error) {
        console.error(`Failed to fetch tour: ${booking.tour}`);
    }

    return {
        ...booking.toObject(),
        userDetails,
        tourDetails,
    };
};

exports.getUserBookings = async (userId) => {
    const bookings = await bookingRepository.findByUserId(userId);

    const bookingDetails = await Promise.all(
        bookings.map(async (booking) => {
            let tourDetails = null;

            try {
                const tourResponse = await axios.get(`${API_GATEWAY_URL}/api/tours/${booking.tour}`);
                tourDetails = tourResponse.data;
            } catch (error) {
                console.error(`Failed to fetch tour: ${booking.tour}`);
            }

            return {
                ...booking.toObject(),
                tourDetails,
            };
        })
    );

    return bookingDetails;
};

exports.updateBooking = async (bookingId, updateData) => {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) {
        throw new Error("Booking not found");
    }
    return await bookingRepository.update(bookingId, updateData);
};

exports.deleteBooking = async (bookingId) => {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) {
        throw new Error("Booking not found");
    }
    return await bookingRepository.delete(bookingId);
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
