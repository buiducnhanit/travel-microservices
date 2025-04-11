const Tour = require("../models/Tour");
const axios = require("axios");
const { API_GATEWAY_URL } = require("../config/env");

exports.createTour = async (tourData) => {
    return await Tour.create(tourData);
};

exports.getAllTours = async () => {
    const tours = await Tour.find({ isDeleted: false })
        .populate({
            path: "images",
            select: "imageUrl"
        })
        .exec();

    const toursWithDestinations = await Promise.all(
        tours.map(async (tour) => {
            if (!tour.destinations || tour.destinations.length === 0) {
                return { ...tour.toObject(), destinations: [] };
            }

            try {
                const destinations = await Promise.all(
                    tour.destinations.map(async (destinationId) => {
                        try {
                            const response = await axios.get(`${API_GATEWAY_URL}/api/destinations/${destinationId}`);
                            return response.data;
                        } catch (error) {
                            console.error(`Error fetching destination ${destinationId}:`, error.message);
                            return null;
                        }
                    })
                );

                return { ...tour.toObject(), destinations: destinations.filter(dest => dest !== null) };
            } catch (error) {
                console.error("Error fetching destinations:", error.message);
                return { ...tour.toObject(), destinations: [] };
            }
        })
    );

    return toursWithDestinations;
};

exports.findTours = async (filters) => {
    return await Tour.find(filters);
}

exports.findTourById = async (tourId) => {
    const tour = await Tour.findOne({ _id: tourId, isDeleted: false })
        .populate({
            path: "images",
            select: "imageUrl"
        })
        .exec();

    if (!tour) {
        console.error(`Tour with ID ${tourId} not found.`);
        return null;
    }

    if (!tour.destinations || tour.destinations.length === 0) {
        return { ...tour.toObject(), destinations: [] };
    }

    try {
        const destinations = await Promise.all(
            tour.destinations.map(async (destinationId) => {
                try {
                    const response = await axios.get(`${API_GATEWAY_URL}/api/destinations/${destinationId}`);
                    return response.data;
                } catch (error) {
                    console.error(`Error fetching destination ${destinationId}:`, error.message);
                    return null;
                }
            })
        );

        return { ...tour.toObject(), destinations: destinations.filter(dest => dest !== null) }; // Loại bỏ null
    } catch (error) {
        console.error("Error fetching destinations:", error.message);
        return { ...tour.toObject(), destinations: [] };
    }
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