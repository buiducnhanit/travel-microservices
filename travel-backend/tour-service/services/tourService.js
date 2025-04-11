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

exports.searchTours = async (query) => {
    let filters = { isDeleted: false };

    if (query.searchText) {
        filters.name = { $regex: query.searchText, $options: "i" };
    }
    if (query.destination) {
        filters.destinations = query.destination;
    }
    if (query.minPrice || query.maxPrice) {
        filters.price = {};
        if (query.minPrice) filters.price.$gte = Number(query.minPrice);
        if (query.maxPrice) filters.price.$lte = Number(query.maxPrice);
    }
    if (query.minDays || query.maxDays) {
        filters.duration = {};
        if (query.minDays) filters.duration.$gte = Number(query.minDays);
        if (query.maxDays) filters.duration.$lte = Number(query.maxDays);
    }
    if (query.requiredSlots) {
        filters.availableSlots = { $gte: Number(query.requiredSlots) };
    }

    return await tourRepository.findTours(filters);
}