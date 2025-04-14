import axios from "axios";
import API_BASE_URL from "../utils/api";
import { Role } from "../types/Role";

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const createRole = (data: Partial<Role>) => {
    const token = localStorage.getItem("token");
    return api.post("/roles", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateRole = (id: string, name: Partial<Role>) => {
    const token = localStorage.getItem("token");
    return api.put(`/roles/${id}`, name, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteRole = (id: string) => {
    const token = localStorage.getItem("token");
    return api.delete(`/roles/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
