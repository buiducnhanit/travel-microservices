const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        duration: { type: Number, required: true },
        destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Destination" }],
        images: [{ type: mongoose.Schema.Types.ObjectId, ref: "TourImage" }],
        availableSlots: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);