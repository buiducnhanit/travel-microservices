const destinationImageRepository = require("../repositories/destinationImageRepository");
const destinationRepository = require("../repositories/destinationRepository");
const cloudinary = require("../config/cloudinary");

exports.getImagesByDestinationId = async (destinationId) => {
    return await destinationImageRepository.getImagesByDestinationId(destinationId);
};

exports.deleteImagesByDestinationId = async (destinationId) => {
    return await destinationImageRepository.deleteImagesByDestinationId(destinationId);
};

exports.uploadImages = async (destination, files) => {

    const imageIds = [];
    for (let file of files) {
        const savedImage = await destinationImageRepository.saveImage(destination, file.path, file.filename);
        imageIds.push(savedImage._id);
    }

    await destinationRepository.addImagesToDestination(destination, imageIds);
};

exports.deleteImageOncloudinary = async (cloudinaryId) => {
    await cloudinary.uploader.destroy(cloudinaryId);
    return await destinationImageRepository.deleteImageByCloudinaryId(cloudinaryId);
};
