import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch';
import { Destination } from "../../types/Destination";
import DestinationCard from '../../components/user/DestinationCard';
import Breadcrumb from '../../components/user/Breadcrumb';
import { useLoading } from '../../context/LoadingContext';

const DestinationPage: React.FC = () => {
    const { data: destinations, error } = useFetch<Destination[]>("/destinations");
    const { isLoading } = useLoading();
    const [visibleDestinations, setVisibleDestinations] = useState(6);

    return (
        <section className='destination-page'>
            <Breadcrumb
                title="Destinations"
                links={[{ name: "Home", href: "/" }]}
            />
            <div className="container mx-auto py-12 px-4">
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading destinations...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : destinations && destinations.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-3 gap-6">
                            {destinations.slice(0, visibleDestinations).map((destination) => (
                                <DestinationCard key={destination._id} destination={destination} />
                            ))}
                        </div>
                        {visibleDestinations < destinations.length && (
                            <div className="flex justify-center mt-8">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                                    onClick={() => setVisibleDestinations((prev) => prev + 6)}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center text-gray-500">No destinations available.</p>
                )}
            </div>
        </section>
    );
};


export default DestinationPage