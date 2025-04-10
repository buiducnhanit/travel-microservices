import React from "react";
import { useLoading } from "../../context/LoadingContext";

const LoadingOverlay: React.FC = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black-500/30 backdrop-blur-sm z-50 transition-opacity duration-300">
            <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-500 text-lg font-semibold animate-pulse">Loading...</p>
        </div>
    );
};

export default LoadingOverlay;
