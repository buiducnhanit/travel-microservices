/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Tour } from "../../types/Tour";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLoading } from "../../context/LoadingContext";
import { getMyInformation } from "../../services/authService";
import Breadcrumb from "../../components/user/Breadcrumb";

const TourDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: tour, error } = useFetch<Tour>(`/tours/${id}`);
    const { isLoading } = useLoading();
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("description");
    const navigate = useNavigate();

    const handleBookNow = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        navigate(`/booking/${tour?._id}`);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getMyInformation();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    if (isLoading) return <p className="text-center text-gray-500">Loading tour details...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!tour) return <p className="text-center text-gray-500">Tour not found.</p>;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <section>
            <Breadcrumb
                title="Tour Detail"
                links={[{ name: "Home", href: "/" }]}
            />

            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        {tour.images.length > 1 ? (
                            <Slider {...settings}>
                                {tour.images.map((img, index) => (
                                    <div key={index}>
                                        <img
                                            src={img.imageUrl}
                                            alt={tour.name}
                                            className="w-full h-[400px] object-cover rounded-xl"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <img
                                src={tour.images[0]?.imageUrl || "/default-tour.jpg"}
                                alt={tour.name}
                                className="w-full h-[400px] object-cover rounded-xl"
                            />
                        )}
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-2">{tour.name}</h1>
                        <p className="text-xl text-blue-600 font-semibold mb-4">${tour.price}</p>
                        <p className="text-gray-600 mb-4">{tour.description}</p>

                        <div className="mb-4">
                            <p><strong>Duration:</strong> {tour.duration} days</p>
                            <p><strong>Available Slots:</strong> {tour.availableSlots}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Destinations:</h3>
                            <ul className="space-y-1">
                                {tour.destinations.map((dest) => (
                                    <li key={dest._id} className="text-blue-600">
                                        {dest.name} - {dest.location.city}, {dest.location.country}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={handleBookNow}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            Book Now
                        </button>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-16 border rounded-xl shadow-sm">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`px-6 py-3 font-medium text-sm ${activeTab === "description"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500"
                                }`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`px-6 py-3 font-medium text-sm ${activeTab === "reviews"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500"
                                }`}
                        >
                            Reviews (1)
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === "description" && (
                            <p className="text-gray-600 leading-relaxed">
                                {tour.description}
                            </p>
                        )}

                        {activeTab === "reviews" && (
                            <div className="space-y-6">
                                <div className="flex space-x-4">
                                    <img
                                        src="/assets/images/avatar-01.jpg"
                                        alt="Reviewer"
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold">Ariana Grande</span>
                                            <div className="text-yellow-400 flex">
                                                <i className="zmdi zmdi-star" />
                                                <i className="zmdi zmdi-star" />
                                                <i className="zmdi zmdi-star" />
                                                <i className="zmdi zmdi-star" />
                                                <i className="zmdi zmdi-star-half" />
                                            </div>
                                        </div>
                                        <p className="text-gray-600">
                                            Great experience, loved the scenery and organization.
                                        </p>
                                    </div>
                                </div>

                                <form className="space-y-4 pt-6 border-t mt-6">
                                    <h5 className="font-semibold text-lg">Add a review</h5>
                                    <p className="text-sm text-gray-500">Your email will not be published.</p>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-sm">Your Rating:</span>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className="zmdi zmdi-star-outline cursor-pointer" />
                                            ))}
                                        </div>
                                    </div>
                                    <textarea
                                        className="w-full border p-3 rounded-md text-sm"
                                        placeholder="Your review"
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="border p-3 rounded-md text-sm"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="border p-3 rounded-md text-sm"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TourDetails;
