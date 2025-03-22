const Destination = require("../models/Destination");

exports.createDestination = async (destinationData) => {
    return await Destination.create(destinationData);
};

exports.getAllDestinations = async () => {
    return await Destination.find({ isDeleted: false }).populate({
        path: "images",
        select: "imageUrl"
    })
        .exec();
};

exports.getDestinationById = async (destinationId) => {
    return await Destination.findOne({ _id: destinationId, isDeleted: false }).populate({
        path: "images",
        select: "imageUrl"
    })
        .exec();
};

exports.addImagesToDestination = async (destinationId, imageIds) => {
    return await Destination.findByIdAndUpdate(
        destinationId,
        { $push: { images: { $each: imageIds } } },
        { new: true }
    ).populate("images");
};

exports.updateDestination = async (destinationId, updateData) => {
    return await Destination.findByIdAndUpdate(destinationId, updateData, { new: true });
};

exports.deleteDestination = async (destinationId) => {
    return await Destination.findByIdAndUpdate(destinationId, { isDeleted: true }, { new: true });
};