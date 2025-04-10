import { Icon } from '@iconify/react/dist/iconify.cjs'
import React from 'react'
import Breadcrumb from '../../components/user/Breadcrumb'

const Contact: React.FC = () => {
    return (
        <section className="contact">
            <Breadcrumb
                title="Contact"
                links={[
                    { name: "Home", href: "/" },
                ]}
            />
            <div className="mb-24">
                <div className="bg-gray-50 py-20">
                    <div className="mx-10 flex gap-1">
                        {/* Contact Form */}
                        <div className="w-full md:w-1/2 bg-white rounded-lg p-8 border border-gray-200">
                            <form>
                                <h4 className="text-2xl font-semibold text-center mb-8">
                                    Send Us A Message
                                </h4>

                                {/* Email Input */}
                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Your Email Address"
                                        className="w-full border rounded-lg py-3 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Icon className="absolute left-4 top-3.5 pointer-events-none w-6 h-6 opacity-50" icon="material-symbols:mail-outline" width="48" height="48" />
                                </div>

                                {/* Message Input */}
                                <div className="mb-6">
                                    <textarea
                                        name="msg"
                                        placeholder="How Can We Help?"
                                        className="w-full border rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={5}
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="uppercase bg-black text-white py-3 px-6 rounded-md w-full mt-2 hover:bg-gray-800 transition duration-300"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="w-full md:w-1/2 bg-white rounded-lg p-8 border border-gray-200 mt-10 md:mt-0">
                            {/* Address */}
                            <div className="flex items-start mb-8">
                                <span className="text-2xl text-blue-500 mr-4">
                                    <i className="lnr lnr-map-marker"></i>
                                </span>
                                <div>
                                    <h5 className="text-xl font-semibold mb-2">Address</h5>
                                    <p className="text-gray-600">
                                        Hanoi Highway High-Tech Park, Hiep Phu, District 9, Ho Chi Minh City, Vietnam
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start mb-8">
                                <span className="text-2xl text-blue-500 mr-4">
                                    <i className="lnr lnr-phone-handset"></i>
                                </span>
                                <div>
                                    <h5 className="text-xl font-semibold mb-2">Lets Talk</h5>
                                    <p className="text-gray-800 font-medium">+84 398 669973</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start">
                                <span className="text-2xl text-blue-500 mr-4">
                                    <i className="lnr lnr-envelope"></i>
                                </span>
                                <div>
                                    <h5 className="text-xl font-semibold mb-2">Sale Support</h5>
                                    <p className="text-gray-800 font-medium">
                                        buiducnhan.it@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4659.825474057682!2d106.78237127790274!3d10.854821959893455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276e7ea103df%3A0xb6cf10bb7d719327!2zSFVURUNIIC0gxJDhuqFpIGjhu41jIEPDtG5nIG5naOG7hyBUUC5IQ00gKFRodSBEdWMgQ2FtcHVzKQ!5e0!3m2!1svi!2s!4v1735323228488!5m2!1svi!2s"
                    width="100%"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0 rounded-lg"
                ></iframe>
            </div>

        </section>
    )
}

export default Contact