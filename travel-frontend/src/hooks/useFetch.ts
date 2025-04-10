/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import API_BASE_URL from "../utils/api";
import { useLoading } from "../context/LoadingContext";

const useFetch = <T,>(endpoint: string, options?: AxiosRequestConfig) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<T>(`${API_BASE_URL}${endpoint}`, options);
                setData(response.data);
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, JSON.stringify(options), setLoading]);
    return { data, error };
};

export default useFetch;
