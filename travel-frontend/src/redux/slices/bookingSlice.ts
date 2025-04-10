/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Booking } from "../../types/Booking";

// Trạng thái ban đầu
interface BookingState {
    bookings: Booking[];
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    loading: false,
    error: null,
};

// Fetch danh sách booking từ API
export const fetchBookings = createAsyncThunk(
    "bookings/fetchBookings",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/api/bookings");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error fetching bookings");
        }
    }
);

// Cập nhật booking
export const updateBooking = createAsyncThunk(
    "bookings/updateBooking",
    async (booking: Booking, { rejectWithValue }) => {
        try {
            await axios.put(`http://localhost:5000/api/bookings/${booking._id}`, booking);
            return booking;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error updating booking");
        }
    }
);

// Xóa booking
export const deleteBooking = createAsyncThunk(
    "bookings/deleteBooking",
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:5000/api/bookings/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error deleting booking");
        }
    }
);

// Slice Redux
const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.bookings = state.bookings.map((booking) =>
                    booking._id === action.payload._id ? action.payload : booking
                );
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.bookings = state.bookings.filter((booking) => booking._id !== action.payload);
            });
    },
});

export default bookingSlice.reducer;
