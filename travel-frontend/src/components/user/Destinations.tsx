import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Destination } from "../../types/Destination";
import { useLoading } from "../../context/LoadingContext";
import DestinationCard from "./DestinationCard";

const Destinations: React.FC = () => {
    const { data: destinations, error } = useFetch<Destination[]>("/destinations");
    const { isLoading } = useLoading();

    if (isLoading) return <p className="text-center text-gray-500">Loading destinations...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const displayedDestinations = destinations?.slice(0, 6) || [];

    return (
        <section className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold text-center mb-8">Top Destinations</h2>
                    <Link to={"destinations"}>View more</Link>
                </div>

                {/* Grid danh sách địa điểm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedDestinations.map((destination) => (
                            <DestinationCard key={destination._id} destination={destination} />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;
