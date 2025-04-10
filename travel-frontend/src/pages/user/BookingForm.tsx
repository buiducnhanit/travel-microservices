import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../../services/bookingService";
import Breadcrumb from "../../components/user/Breadcrumb";

const BookingForm: React.FC = () => {
    const { tourId } = useParams<{ tourId: string }>();
    const [step, setStep] = useState<"form" | "payment" | "success">("form");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        people: 1,
        notes: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("payment");
    };

    const handlePayment = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem("auth") || "{}");

            if (!tourId) {
                alert("Tour ID is required");
                return;
            }

            const response = await createBooking(auth.user.user, tourId, formData);

            if (response.status === 201) {
                setStep("success");
            }
        } catch (error) {
            console.error("Error during booking creation:", error);
            alert("Có lỗi xảy ra khi tạo booking");
        }
    };

    const handleBack = () => {
        if (step === "payment") setStep("form");
        if (step === "success") setStep("payment");
    };

    const steps = ["Booking Info", "Payment", "Success"];

    const handleViewHistory = async () => {
        navigate("/account?tab=history");
    }

    const renderStepIndicator = () => {
        const stepMap = {
            form: 0,
            payment: 1,
            success: 2,
        };
        const currentIndex = stepMap[step];

        return (
            <div className="flex justify-center mb-10">
                {steps.map((label, index) => {
                    const isActive = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <div key={index} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold 
                                ${isActive ? (isCurrent ? "bg-blue-600" : "bg-green-500") : "bg-gray-300"}`}
                            >
                                {index + 1}
                            </div>
                            <span
                                className={`ml-2 mr-4 text-sm font-medium 
                                ${isCurrent ? "text-blue-600" : isActive ? "text-green-600" : "text-gray-500"}`}
                            >
                                {label}
                            </span>
                            {index < steps.length - 1 && (
                                <div className={`w-6 h-1 ${index < currentIndex ? "bg-green-500" : "bg-gray-300"} mx-2 rounded`} />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <section>
            <Breadcrumb
                title="Booking"
                links={[{ name: "Home", href: "/" }]}
            />

            <div className="container mx-auto py-10 px-4 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-6">Book Your Tour</h2>
                {renderStepIndicator()}

                {step === "form" && (
                    <form onSubmit={handleSubmitForm} className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
                        <input
                            className="w-full border p-3 rounded"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />
                        <input
                            className="w-full border p-3 rounded"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            className="w-full border p-3 rounded"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            required
                        />
                        <input
                            className="w-full border p-3 rounded"
                            name="people"
                            type="number"
                            min={1}
                            value={formData.people}
                            onChange={handleChange}
                            placeholder="Number of People"
                            required
                        />
                        <textarea
                            className="w-full border p-3 rounded"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Additional Notes"
                        />
                        <div className="flex justify-between">
                            {step !== "form" ? (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400"
                                >
                                    Back
                                </button>
                            ) : <div />}
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </form>
                )}

                {step === "payment" && (
                    <div className="bg-white p-8 shadow-lg rounded-lg space-y-8 text-center max-w-lg mx-auto">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Payment Summary</h3>

                        {/* Thông tin thanh toán */}
                        <div className="space-y-4 text-left">
                            <p className="text-gray-700"><strong>Full Name:</strong> {formData.fullName}</p>
                            <p className="text-gray-700"><strong>Email:</strong> {formData.email}</p>
                            <p className="text-gray-700"><strong>Phone:</strong> {formData.phone}</p>
                            <p className="text-gray-700"><strong>People:</strong> {formData.people}</p>
                            <p className="text-gray-700"><strong>Notes:</strong> {formData.notes || "No additional notes"}</p>
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={handleBack}
                                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
                            >
                                Back
                            </button>
                            <button
                                onClick={handlePayment}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold transition duration-300"
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                )}

                {step === "success" && (
                    <div className="text-center p-10 bg-green-50 border border-green-200 rounded-lg shadow">
                        <h3 className="text-2xl font-bold text-green-700 mb-4">🎉 Booking Successful!</h3>
                        <p className="text-gray-700">
                            Thank you for booking. A confirmation email has been sent to <strong>{formData.email}</strong>.
                        </p>
                        <button
                            onClick={handleViewHistory}
                            className="mt-6 bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400"
                        >
                            View History Booking
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BookingForm;
