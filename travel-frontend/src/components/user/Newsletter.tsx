import React from "react";

const Newsletter: React.FC = () => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="row justify-center">
                    <div className="col-md-8 py-5 my-5">
                        <div className="subscribe-header text-center pb-3">
                            <h2 className="text-5xl font-semibold text-gray-800 mt-2">
                                Sign Up For Our Newsletter
                            </h2>
                        </div>
                        <form id="form" className="flex flex-wrap gap-2">
                            <input
                                type="text"
                                name="email"
                                placeholder="Your Email Address"
                                className="form-control form-control-lg px-4 py-2 border border-gray-300 rounded-md w-full"
                            />
                            <button className="uppercase bg-black text-white py-3 px-6 rounded-md w-full mt-2 hover:bg-gray-800 transition duration-300">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
