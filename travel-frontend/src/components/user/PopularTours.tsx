import React from "react";
import TourCard from "./TourCard";
import { Tour } from "../../types/Tour";
import useFetch from "../../hooks/useFetch";
import { useLoading } from "../../context/LoadingContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const PopularTours: React.FC = () => {
    const { data: tours, error } = useFetch<Tour[]>("/tours");
    const { isLoading } = useLoading();

    if (isLoading) return <p className="text-center text-gray-500">Loading tours...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const displayedTours = tours?.slice(0, 6) || [];

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold text-center mb-8">Popular Tours</h2>
                    <Link to={"tours"}>
                        View more
                    </Link>
                </div>
                {/* Slick Carousel */}
                <Slider {...settings}>
                    {displayedTours.map((tour) => (
                        <div key={tour._id} className="px-2">
                            <TourCard tour={tour} />
                        </div>
                    ))}
                </Slider>

            </div>
        </section>
    );
};

export default PopularTours;
