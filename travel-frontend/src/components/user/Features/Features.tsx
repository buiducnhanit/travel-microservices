import React from 'react';

const Features: React.FC = () => {
    return (
        <div className="py-20 bg-gray-100">
            <h2 className="pb-10 text-center text-5xl font-semibold text-gray-800 mt-2">Why Choose Us?</h2>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Feature 1: Easy Booking */}
                    <div className="text-center py-5" data-aos="fade-in" data-aos-delay="0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" className='mx-auto'>
                            <path fill="#a6a2a2" d="M12 12h5v5h-5zm7-9h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 2v2H5V5zM5 19V9h14v10z" />
                        </svg>
                        <h4 className="text-xl font-semibold text-gray-800 my-3">Easy Booking</h4>
                        <p className="text-gray-600">Book your trips seamlessly with just a few clicks.</p>
                    </div>

                    {/* Feature 2: Personalized Trips */}
                    <div className="text-center py-5" data-aos="fade-in" data-aos-delay="300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" className='mx-auto'>
                            <path fill="none" stroke="#a6a2a2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2c-2.7 0-5 2.3-5 5 0 1.9 1.1 3.6 2.7 4.5L8 20h8l-1.7-8.5c1.6-.9 2.7-2.6 2.7-4.5 0-2.7-2.3-5-5-5z" />
                        </svg>
                        <h4 className="text-xl font-semibold text-gray-800 my-3">Personalized Trips</h4>
                        <p className="text-gray-600">Custom travel plans tailored just for you.</p>
                    </div>

                    {/* Feature 3: Best Price Guarantee */}
                    <div className="text-center py-5" data-aos="fade-in" data-aos-delay="600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" className='mx-auto'>
                            <path fill="#a6a2a2" d="M12 2L2 7l10 5 10-5zM2 17v2h20v-2H2zm10-4L2 8v2l10 5 10-5V8l-10 5z" />
                        </svg>
                        <h4 className="text-xl font-semibold text-gray-800 my-3">Best Price Guarantee</h4>
                        <p className="text-gray-600">We offer the best prices for your dream vacations.</p>
                    </div>

                    {/* Feature 4: 24/7 Support */}
                    <div className="text-center py-5" data-aos="fade-in" data-aos-delay="900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" className='mx-auto'>
                            <g fill="none" stroke="#a6a2a2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                <path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16m-1-4C2 6 6.39 2 11.807 2C16.208 2 19.758 4.335 21 8" />
                                <path d="m7 17l-4-1l-1 4M17 7l4 1l1-4" />
                            </g>
                        </svg>
                        <h4 className="text-xl font-semibold text-gray-800 my-3">24/7 Customer Support</h4>
                        <p className="text-gray-600">Our team is here to help you anytime, anywhere.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
