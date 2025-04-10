import axios from "axios";
import API_BASE_URL from "../utils/api";
import { Role } from "../types/Role";

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log(token)
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

export const updateRole = (id: string, data: Partial<Role>) => {
    return api.put(`/roles/${id}`, data);
};

export const deleteRole = (id: string) => {
    return api.delete(`/roles/${id}`);
};
