/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Customer } from "../../types/Customer";

interface CustomerState {
    customers: Customer[];
    loading: boolean;
    error: string | null;
}

const initialState: CustomerState = {
    customers: [],
    loading: false,
    error: null,
};

// Fetch danh sách khách hàng
export const fetchCustomers = createAsyncThunk("customers/fetchCustomers", async () => {
    const response = await axios.get("http://localhost:5000/api/auth/users");
    return response.data;
});

// Cập nhật khách hàng
export const updateCustomer = createAsyncThunk(
    "customers/updateCustomer",
    async ({ id, data }: { id: string; data: Partial<Customer> }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/auth/users/${id}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error updating customer");
        }
    }
);

// Xóa khách hàng
export const deleteCustomer = createAsyncThunk(
    "customers/deleteCustomer",
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error deleting customer");
        }
    }
);

const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.map((customer) =>
                    customer._id === action.payload._id ? action.payload : customer
                );
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter((customer) => customer._id !== action.payload);
            });
    },
});

export default customerSlice.reducer;
