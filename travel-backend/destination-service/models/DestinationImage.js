const mongoose = require("mongoose");

const destinationImageSchema = new mongoose.Schema(
    {
        destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true },
        imageUrl: { type: String, required: true },
        cloudinaryId: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("DestinationImage", destinationImageSchema);
