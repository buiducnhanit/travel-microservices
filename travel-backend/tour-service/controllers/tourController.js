const tourService = require("../services/tourService");
const Tour = require('../models/Tour');

exports.createTour = async (req, res) => {
    try {
        const tourData = JSON.parse(req.body.tourData);
        const tour = await tourService.createTour(tourData, req.files);
        const newTour = await tourService.getTourById(tour._id);
        res.status(201).json({ message: "Tour created successfully", newTour });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTours = async (req, res) => {
    try {
        const tours = await tourService.getAllTours();
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTourById = async (req, res) => {
    try {
        const tour = await tourService.getTourById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tourId = req.params.id;
        const updateData = req.body.tourData ? JSON.parse(req.body.tourData) : {};
        const files = req.files;

        const tour = await tourService.updateTour(tourId, updateData, files);
        const updatedTour = await tourService.getTourById(tour._id);
        res.json({
            message: "Tour updated successfully",
            destination: updatedTour
        });
    } catch (error) {
        console.error("Error updating tour:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTour = await tourService.deleteTour(id);
        res.status(200).json({ message: "Tour soft deleted successfully", data: deletedTour });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.searchTours = async (req, res) => {
    try {
        const tours = await tourService.searchTours(req.query);
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tours", error });
    }
}

exports.updateTourSlots = async (req, res) => {
    try {
        const { id } = req.params;
        const { availableSlots } = req.body;

        if (availableSlots < 0) {
            return res.status(400).json({ message: "Số lượng slot không thể nhỏ hơn 0" });
        }

        const tour = await tourService.getTourById(id);

        if (!tour) {
            return res.status(404).json({ message: "Tour không tồn tại" });
        }

        tour.availableSlots = availableSlots;

        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { availableSlots },
            { new: true }
        );

        if (!updatedTour) {
            return res.status(404).json({ message: "Không thể cập nhật tour" });
        }

        res.status(200).json({
            message: "Số lượng slot đã được cập nhật thành công",
            tour: updatedTour,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật slot" });
    }
};
