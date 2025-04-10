import React from "react";
import { Link } from "react-router-dom";
import { Tour } from "../../types/Tour";

interface TourCardProps {
    tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden transition-all transform hover:scale-105 hover:shadow-xl duration-300">
            <div className="relative">
                <img
                    src={tour.images.length > 0 ? tour.images[0].imageUrl : "/default-tour.jpg"}
                    alt={tour.name}
                    className="w-full h-56 object-cover"
                />
                <span className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1 text-sm rounded-lg shadow-md">
                    ${tour.price}
                </span>
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">
                    <Link to={`/tours/${tour._id}`} className="hover:text-blue-500 transition-colors">
                        {tour.name}
                    </Link>
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {tour.description}
                </p>
                <div className="mt-4">
                    <Link
                        to={`/tours/${tour._id}`}
                        className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TourCard;
