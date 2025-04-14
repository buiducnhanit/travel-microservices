import axios from "axios";
import API_BASE_URL from "../utils/api";
import { Destination } from "../types/Destination";

// Lấy danh sách tất cả destinations
export const getDestinations = async (): Promise<Destination[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/destinations`);
        if (!response.ok) throw new Error("Failed to fetch destinations");
        return await response.json();
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return [];
    }
};

// Lấy một destination theo ID
export const getDestinationById = async (destinationId: string): Promise<Destination | null> => {
    try {
        const response = await axios.get<Destination>(`${API_BASE_URL}/destinations/${destinationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching destination by ID:", error);
        return null;
    }
};

// Tạo một destination mới
export const createDestination = async (destinationData: Partial<Destination>, images: File[]): Promise<Destination> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const formData = new FormData();

    formData.append("destinationData", JSON.stringify(destinationData));

    images.forEach((image) => formData.append("images", image));

    const response = await axios.post<Destination>(`${API_BASE_URL}/destinations`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
};

// Cập nhật destination
export const updateDestination = async (destinationId: string, destinationData: Partial<Destination>, images?: File[]): Promise<Destination> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const formData = new FormData();

    formData.append("destinationData", JSON.stringify(destinationData));

    if (images) {
        images.forEach((image) => formData.append("images", image));
    }

    try {
        const response = await axios.put<Destination>(`${API_BASE_URL}/destinations/${destinationId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating destination:", error);
        throw error;
    }
};

// Xóa destination
export const deleteDestination = async (destinationId: string): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        await axios.delete(`${API_BASE_URL}/destinations/${destinationId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error("Error deleting destination:", error);
        throw error;
    }
};
