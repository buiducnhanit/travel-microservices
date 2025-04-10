/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import API_BASE_URL from "../utils/api";
import { Booking } from "../types/Booking";

export const bookTour = async (user: string, tour: string) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.post(`${API_BASE_URL}/bookings`, { tour, user }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getBookings = async (): Promise<Booking[]> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const response = await axios.get(`${API_BASE_URL}/bookings`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch bookings");
    }
};

export const updateBooking = async (updatedBooking: Booking) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const response = await axios.put(`${API_BASE_URL}/bookings/${updatedBooking._id}`, updatedBooking, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to update booking");
    }
};

export const deleteBooking = async (bookingId: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to delete booking");
    }
};

export const getBookingHistory = async (user: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const response = await axios.post(`${API_BASE_URL}/bookings/history-booking`, { user }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createBooking = async (user: any, tourId: string, formData: any) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const response = await axios.post(`${API_BASE_URL}/bookings`, {
            user: user._id,
            tour: tourId,
            ...formData,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error("Error during booking creation:", error);
        throw new Error("Có lỗi xảy ra khi tạo booking");
    }
};