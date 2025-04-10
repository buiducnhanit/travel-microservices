/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import API_BASE_URL from "../utils/api";

export const login = async (email: string, password: string) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        return data;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Invalid email or password");
    }
};

export const register = async (name: string, email: string, password: string) => {
    try {
        await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Failed to register");
    }
};

export const getMyInformation = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const { data } = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to get information");
    }
}

export const changePassword = async (id: string, oldPassword: string, newPassword: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/change-password`, { id, oldPassword, newPassword },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
};