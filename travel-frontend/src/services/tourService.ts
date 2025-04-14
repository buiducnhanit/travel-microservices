import axios from "axios";
import API_BASE_URL from "../utils/api";
import { Tour } from "../types/Tour";

export const getTours = async (): Promise<Tour[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/tours`);
        if (!response.ok) throw new Error("Failed to fetch tours");
        return await response.json();
    } catch (error) {
        console.error("Error fetching tours:", error);
        return [];
    }
};

export const getTourById = async (tourId: string): Promise<Tour | null> => {
    try {
        const response = await axios.get<Tour>(`${API_BASE_URL}/tours/${tourId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tour by ID:", error);
        return null;
    }
};

export const createTour = async (tourData: Partial<Omit<Tour, "destinations">> & { destinations: string[] }, images: File[]): Promise<Tour> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const formData = new FormData();

    formData.append("tourData", JSON.stringify(tourData));

    images.forEach((image) => formData.append("images", image));

    const response = await axios.post<Tour>(`${API_BASE_URL}/tours`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
};

export const updateTour = async (tourId: string, tourData: Partial<Omit<Tour, "destinations">> & { destinations: string[] }, images?: File[]): Promise<Tour> => {
    const formData = new FormData();

    formData.append("tourData", JSON.stringify(tourData));

    if (images) {
        images.forEach((image) => formData.append("images", image));
    }

    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const response = await axios.put<Tour>(`${API_BASE_URL}/tours/${tourId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating tour:", error);
        throw error;
    }
};

export const deleteTour = async (tourId: string): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        await axios.delete(`${API_BASE_URL}/tours/${tourId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error("Error deleting tour:", error);
        throw error;
    }
};

export const searchTours = async (filters: {
    searchText?: string;
    destination?: string;
    minPrice?: string;
    maxPrice?: string;
    minDays?: string;
    maxDays?: string;
    requiredSlots?: string;
}) => {
    const queryParams = new URLSearchParams();

    if (filters.searchText) queryParams.append("searchText", filters.searchText);
    if (filters.destination) queryParams.append("destination", filters.destination);
    if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
    if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
    if (filters.minDays) queryParams.append("minDays", filters.minDays);
    if (filters.maxDays) queryParams.append("maxDays", filters.maxDays);
    if (filters.requiredSlots) queryParams.append("requiredSlots", filters.requiredSlots);

    const response = await fetch(`${API_BASE_URL}/tours/search?${queryParams.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch tours");
    }

    return await response.json();
};