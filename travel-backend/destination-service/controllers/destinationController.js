const destinationService = require("../services/destinationService");

exports.createDestination = async (req, res) => {
    try {
        const destinationData = JSON.parse(req.body.destinationData);
        const destination = await destinationService.createDestination(destinationData, req.files);
        const newDestination = await destinationService.getDestinationById(destination._id);
        res.status(201).json({ message: "Destination created successfully", newDestination });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllDestinations = async (req, res) => {
    try {
        const destinations = await destinationService.getAllDestinations();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDestinationById = async (req, res) => {
    try {
        const destination = await destinationService.getDestinationById(req.params.id);
        if (!destination) return res.status(404).json({ message: "Destination not found" });
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDestination = async (req, res) => {
    try {
        const destinationId = req.params.id;
        const updateData = req.body;
        const files = req.files;

        const destination = await destinationService.updateDestination(destinationId, updateData, files);
        const updatedDestination = await destinationService.getDestinationById(destination._id);
        res.json({
            message: "Destination updated successfully",
            destination: updatedDestination
        });
    } catch (error) {
        console.error("Error updating destination:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDestination = await destinationService.deleteDestination(id);
        res.status(200).json({ message: "Destination soft deleted successfully", data: deletedDestination });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};