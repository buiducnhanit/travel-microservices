const tourRepository = require("../repositories/tourRepository");
const tourImageService = require("./tourImageService");

exports.createTour = async (tourData, files) => {
    const newTour = await tourRepository.createTour(tourData);

    if (files && files.length > 0) {
        await tourImageService.uploadImages(newTour._id, files);
    }

    return newTour;
};

exports.getAllTours = async () => {
    return await tourRepository.getAllTours();
};

exports.getTourById = async (tourId) => {
    return await tourRepository.findTourById(tourId);
};

exports.updateTour = async (tourId, updateData, files) => {

    if (files && files.length > 0) {    
        const oldImages = await tourImageService.getImagesByTour(tourId);

        for (let image of oldImages) {
            await tourImageService.deleteImageOncloudinary(image.cloudinaryId);
        }

        await tourImageService.deleteImagesByTourId(tourId);
        await tourImageService.uploadImages(tourId, files);
    }

    return await tourRepository.updateTour(tourId, updateData);
};

exports.deleteTour = async (tourId) => {
    const tour = await tourRepository.deleteTour(tourId);
    if (!tour) {
        throw new Error("Destination not found!");
    }
    return tour;
};