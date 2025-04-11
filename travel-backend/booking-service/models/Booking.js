const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        people: { type: Number, required: true, min: 1 },
        notes: { type: String },
        status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
        bookingDate: { type: Date, default: Date.now },
        totalPrice: { type: Number, required: true },
        paymentStatus: { type: String, enum: ["Unpaid", "Paid", "Failed"], default: "Unpaid" },
        paymentDate: { type: Date },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
