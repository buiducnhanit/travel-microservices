const DestinationImage = require("../models/DestinationImage");

exports.saveImage = async (destination, imageUrl, cloudinaryId) => {
    return await DestinationImage.create({
        destination,
        imageUrl,
        cloudinaryId
    });
};

exports.getImagesByDestinationId = async (destination) => {
    return await DestinationImage.find({ destination });
};

exports.deleteImagesByDestinationId = async (destination) => {
    return await DestinationImage.deleteMany({ destination });
};

exports.deleteImageByCloudinaryId = async (cloudinaryId) => {
    return await DestinationImage.findOneAndDelete({ cloudinaryId });
};