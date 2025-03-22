const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        location: {
            country: { type: String },
            city: { type: String },
            coordinates: {
                lat: { type: Number },
                lng: { type: Number }
            }
        },
        images: [{ type: mongoose.Schema.Types.ObjectId, ref: "DestinationImage" }],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);