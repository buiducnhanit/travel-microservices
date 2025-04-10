import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Tour } from '../../types/Tour';
import TourList from '../../components/user/TourList';
import Breadcrumb from '../../components/user/Breadcrumb';
import { useLoading } from '../../context/LoadingContext';

const Tours: React.FC = () => {
    const { data: tours, error } = useFetch<Tour[]>("/tours");
    const { isLoading } = useLoading();
    const [visibleTours, setVisibleTours] = useState(6);

    return (
        <section className="tour-page">
            <Breadcrumb
                title="Tours"
                links={[
                    { name: "Home", href: "/" },
                ]}
            />
            <div className="container mx-auto py-12 px-4">
                {/* Kiểm tra loading trước khi hiển thị danh sách */}
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading tours...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : tours && tours.length > 0 ? (
                    <>
                        <TourList tours={tours.slice(0, visibleTours)} />
                        {visibleTours < tours.length && (
                            <div className="flex justify-center mt-8">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                                    onClick={() => setVisibleTours((prev) => prev + 6)}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center text-gray-500">No tours available.</p>
                )}
            </div>
        </section>
    );
};

export default Tours;
