const tourImageRepository = require("../repositories/tourImageRepository");
const tourRepository = require("../repositories/tourRepository");
const cloudinary = require("../config/cloudinary");

exports.getImagesByTour = async (tourId) => {
    return await tourImageRepository.getImagesByDestinationId(tourId);
};

exports.deleteImagesByTourId = async (tourId) => {
    return await tourImageRepository.deleteImagesByDestinationId(tourId);
};

exports.uploadImages = async (tour, files) => {

    const imageIds = [];
    for (let file of files) {
        const savedImage = await tourImageRepository.saveImage(tour, file.path, file.filename);
        imageIds.push(savedImage._id);
    }

    await tourRepository.addImagesToTour(tour, imageIds);
};

exports.deleteImageOncloudinary = async (cloudinaryId) => {
    await cloudinary.uploader.destroy(cloudinaryId);
    return await tourImageRepository.deleteImageByCloudinaryId(cloudinaryId);
};