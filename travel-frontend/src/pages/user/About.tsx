import React from 'react'
import Breadcrumb from '../../components/user/Breadcrumb'

const About: React.FC = () => {
    return (
        <section className='about'>
            <Breadcrumb
                title="About Us"
                links={[
                    { name: 'Home', href: '/' },
                ]} />
            <div className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    {/* Our Story Section */}
                    <div className="flex flex-wrap items-center mb-16">
                        <div className="w-full md:w-7/12 lg:w-8/12 mb-8 md:mb-0">
                            <div className="pr-0 md:pr-20">
                                <h3 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h3>
                                <p className="text-gray-600 mb-6">
                                    We are passionate about travel and believe that everyone deserves to experience the beauty and wonder of the world. Our journey began with the goal of helping people explore new places, create unforgettable memories, and discover diverse cultures. From humble beginnings, we have grown into a trusted travel partner for countless travelers seeking adventure, relaxation, and exploration.
                                </p>
                                <p className="text-gray-600 mb-6">
                                    Over the years, we’ve curated a wide range of tours that cater to different interests and budgets, from luxury escapes to adventurous treks. Our team of travel experts is dedicated to providing exceptional service and ensuring that your travel experience is seamless and unforgettable. Whether you're looking for a beach getaway, a cultural immersion, or an adrenaline-filled adventure, we are here to make your dream vacation a reality.
                                </p>
                                <p className="text-gray-600">
                                    Have any questions? Reach us at our office at 8th floor, 379 Hudson St, New York, NY 10018, or give us a call at (+1) 96 716 6879.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-5/12 lg:w-4/12">
                            <div className="border rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src="/assets/images/about/about-001.jpg"
                                    alt="Our Story"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Our Mission Section */}
                    <div className="flex flex-wrap items-center">
                        <div className="order-2 md:order-1 w-full md:w-5/12 lg:w-4/12 mb-8 md:mb-0">
                            <div className="border rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src="/assets/images/about/about-002.jpg"
                                    alt="Our Mission"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="order-1 md:order-2 w-full md:w-7/12 lg:w-8/12">
                            <div className="pl-0 md:pl-20">
                                <h3 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h3>
                                <p className="text-gray-600 mb-6">
                                    Our mission is to inspire people to travel and explore the world by providing unforgettable experiences. We aim to make every journey special by offering carefully crafted tours, personalized service, and expert guidance at every step. Whether you're a seasoned traveler or a first-time explorer, our goal is to create a travel experience that exceeds your expectations and leaves you with lifelong memories.
                                </p>
                                <div className="border-l-4 border-gray-400 pl-6 py-4 mt-4">
                                    <p className="text-gray-600 italic mb-2">
                                        “Travel is the only thing you buy that makes you richer.” – Anonymous
                                    </p>
                                    <span className="block text-gray-800 font-medium">- Our Mission</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
