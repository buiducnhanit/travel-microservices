import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero: React.FC = () => {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    };

    const banners = [
        "/assets/images/banner/banner1.jpg",
        "/assets/images/banner/banner4.jpg",
        "/assets/images/banner/banner3.jpg",
    ];

    return (
        <section className="relative w-full h-[700px]">
            <Slider {...settings} className="w-full h-[700px]">
                {banners.map((image, index) => (
                    <div key={index} className="relative w-full h-[700px]">
                        <img
                            src={image}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black-500/30 flex items-center justify-center text-center text-white px-4">
                            <div className="relative z-10">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                    Explore The World With Us
                                </h1>
                                <p className="text-lg md:text-xl mb-6">
                                    Discover amazing places at exclusive deals
                                </p>
                                <Link
                                    to="/tours"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                                >
                                    View Tours
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default Hero;
