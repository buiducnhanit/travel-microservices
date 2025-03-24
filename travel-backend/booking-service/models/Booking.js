const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
        status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
