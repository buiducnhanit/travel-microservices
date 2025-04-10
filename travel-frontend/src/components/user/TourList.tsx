import React from "react";
import TourCard from "./TourCard";
import { Tour } from "../../types/Tour";

interface TourListProps {
    tours: Tour[];
}

const TourList: React.FC<TourListProps> = ({ tours }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
            ))}
        </div>
    );
};

export default TourList;
