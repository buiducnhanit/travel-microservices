import React from "react";
import { Link } from "react-router-dom";
import { Destination } from "../../types/Destination";

interface DestinationCardProps {
    destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
    return (
        <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            {/* Ảnh */}
            <img
                src={destination.images.length > 0 ? destination.images[0].imageUrl : "/default-destination.jpg"}
                alt={destination.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay nhẹ hơn */}
            <div className="absolute inset-0 bg-black-500/60 group-hover:bg-opacity-30 transition-all duration-500 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <Link to={`/destinations/${destination._id}`}>

                    <h3 className="text-xl font-bold text-white px-3 py-1 rounded-lg hover:underline">
                        {destination.name}
                    </h3>
                </Link>
            </div>
        </div>
    );
};

export default DestinationCard;
