const mongoose = require("mongoose");

const tourImageSchema = new mongoose.Schema(
    {
        tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
        imageUrl: { type: String, required: true },
        isPrimary: { type: Boolean, default: false },
        cloudinaryId: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TourImage", tourImageSchema);