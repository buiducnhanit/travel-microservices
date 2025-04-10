import axios from "axios";
import API_BASE_URL from "../utils/api";
import { Customer } from "../types/Customer";

export const getCustomers = async (): Promise<Customer[]> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const response = await axios.get(`${API_BASE_URL}/auth/users`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        return [];
    }
};

export const updateCustomer = async (customerId: string, customerData: Partial<Customer>) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const response = await axios.put(`${API_BASE_URL}/auth/users/${customerId}`, customerData);
        return response.data;
    } catch (error) {
        console.error("Error updating customer:", error);
        throw error;
    }
};

export const deleteCustomer = async (customerId: string): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        await axios.delete(`${API_BASE_URL}/auth/users/${customerId}`);
    } catch (error) {
        console.error("Error deleting customer:", error);
        throw error;
    }
};
