import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.cjs"

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white pt-12 pb-5 mt-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="col-span-1">
                        <div className="footer__about flex flex-col gap-5">
                            <div className="footer__logo">
                                <div className="text-2xl font-bold">Travelo</div>
                            </div>
                            <p className="text-sm mb-4 text-gray-400">We provide the best travel experiences, taking you to the world's most beautiful destinations.</p>
                            <a href="#"><img src="/assets/images/payment.png" alt="Payment Methods" /></a>
                        </div>
                    </div>
                    {/* Tour Sections */}
                    <div className="col-span-1">
                        <div className="footer__widget">
                            <h6 className="text-lg font-semibold mb-4 uppercase">Tour Packages</h6>
                            <ul className="text-sm space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-gray-500">Adventure Tours</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-gray-500">Luxury Escapes</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-gray-500">Beach Holidays</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-gray-500">Family Trips</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* Customer Service Section */}
                    <div className="col-span-1">
                        <div className="footer__widget">
                            <h6 className="text-lg font-semibold mb-4 uppercase">Customer Support</h6>
                            <ul className="text-sm space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-gray-500">Contact Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-gray-500">Payment Methods</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-gray-500">Booking &amp; Cancellations</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-gray-500">Travel Insurance</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* Newsletter Section */}
                    <div className="col-span-1">
                        <div className="footer__widget">
                            <h6 className="text-lg font-semibold mb-4 uppercase">Newsletter</h6>
                            <div className="footer__newslatter">
                                <p className="text-sm mb-4 text-gray-400">Get updates on new travel packages, exclusive discounts, and more!</p>
                                <form action="#" className="flex gap-2">
                                    <input type="text" placeholder="Your email" className="p-2 rounded-l-md bg-black w-full border-b-2 outline-none" />
                                    <button type="submit" className="bg-black text-white p-2 rounded-r-md">
                                        <Icon icon="material-symbols:mail-outline-rounded" width="24" height="24" style={{ color: 'white' }} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-t border-gray-600 my-2 mt-10"></hr>

                {/* Footer Bottom Section */}
                <div className="text-center">
                    <div className="footer__copyright__text">
                        <p className="text-sm">&copy; 2024 Travelo: Your Travel Partner. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
