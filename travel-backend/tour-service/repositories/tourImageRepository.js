const TourImage = require("../models/TourImage");

exports.saveImage = async (tour, imageUrl, cloudinaryId) => {
    return await TourImage.create({
        tour,
        imageUrl,
        cloudinaryId
    });
};

exports.getImagesByTourId = async (tour) => {
    return await TourImage.find({ tour });
};

exports.deleteImagesByTourId = async (tour) => {
    return await TourImage.deleteMany({ tour });
};

exports.deleteImageByCloudinaryId = async (tour) => {
    return await TourImage.findOneAndDelete({ tour });
};
