const destinationRepository = require("../repositories/destinationRepository");
const destinationImageService = require("./destinationImageService");

exports.createDestination = async (destinationData, files) => {
    const newDestination = await destinationRepository.createDestination(destinationData);
    
    if (files && files.length > 0) {
        await destinationImageService.uploadImages(newDestination._id, files);
    }

    return newDestination;
};

exports.getAllDestinations = async () => {
    return await destinationRepository.getAllDestinations();
};

exports.getDestinationById = async (destinationId) => {
    return await destinationRepository.getDestinationById(destinationId);
};

exports.updateDestination = async (destinationId, updateData, files) => {

    if (files && files.length > 0) {    
        const oldImages = await destinationImageService.getImagesByDestinationId(destinationId);

        for (let image of oldImages) {
            await destinationImageService.deleteImageOncloudinary(image.cloudinaryId);
        }

        await destinationImageService.deleteImagesByDestinationId(destinationId);
        await destinationImageService.uploadImages(destinationId, files);
    }

    return await destinationRepository.updateDestination(destinationId, updateData);
};

exports.deleteDestination = async (destinationId) => {
    const destination = await destinationRepository.deleteDestination(destinationId);
    if (!destination) {
        throw new Error("Destination not found!");
    }
    return destination;
};