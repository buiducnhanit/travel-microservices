const Tour = require("../models/Tour");

exports.createTour = async (tourData) => {
    return await Tour.create(tourData);
};

exports.getAllTours = async () => {
    return await Tour.find({ isDeleted: false }).populate({
        path: "images",
        select: "imageUrl"
    })
        .exec();;
};

exports.findTourById = async (tourId) => {
    return await Tour.findOne({ _id: tourId, isDeleted: false }).populate({
        path: "images",
        select: "imageUrl"
    })
        .exec();
};

exports.addImagesToTour = async (tourId, imageIds) => {
    return await Tour.findByIdAndUpdate(
        tourId,
        { $push: { images: { $each: imageIds } } },
        { new: true }
    ).populate("images");
};

exports.updateTour = async (tourId, updateData) => {
    return await Tour.findByIdAndUpdate(tourId, updateData, { new: true });
};

exports.deleteTour = async (tourId) => {
    return await Tour.findByIdAndUpdate(tourId, { isDeleted: true }, { new: true });
};