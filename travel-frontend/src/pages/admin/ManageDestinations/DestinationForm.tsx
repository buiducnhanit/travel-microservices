/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Avatar } from "@mui/material";
import { createDestination, getDestinationById, updateDestination } from "../../../services/destinationService";
import { Destination } from "../../../types/Destination";

const DestinationForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [destination, setDestination] = useState<Partial<Destination>>({
        name: "",
        location: { country: "", city: "" },
        description: "",
        images: [],
    });

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            fetchDestination();
        }
    }, [id]);

    const fetchDestination = async () => {
        const data = await getDestinationById(id!);
        if (data) {
            setDestination(data);
            setImagePreviews(data.images.map((img) => img.imageUrl));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDestination((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDestination((prev) => ({
            ...prev,
            location: {
                ...prev.location!,
                [name]: value,
            },
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedImages(files);

            const newPreviews = files.map((file) => URL.createObjectURL(file));
            setImagePreviews(newPreviews);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await updateDestination(id, destination, selectedImages);
        } else {
            await createDestination(destination, selectedImages);
        }
        navigate("/dashboard/destinations");
    };

    return (
        <Box sx={{ maxWidth: 1, margin: "auto", padding: 3 }}>
            <Typography variant="h4" gutterBottom>{id ? "Edit Destination" : "Create Destination"}</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Destination Name"
                    name="name"
                    value={destination.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={destination.location?.country || ""}
                    onChange={handleLocationChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={destination.location?.city || ""}
                    onChange={handleLocationChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={destination.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    margin="normal"
                />

                {/* Hiển thị ảnh hiện có */}
                {imagePreviews.length > 0 && (
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                        {imagePreviews.map((image, index) => (
                            <Avatar key={index} src={image} alt={`Destination Image ${index}`} sx={{ width: 100, height: 100 }} />
                        ))}
                    </Box>
                )}

                <input type="file" multiple onChange={handleImageChange} style={{ marginTop: 10 }} />

                <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        {id ? "Update Destination" : "Create Destination"}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => navigate("/dashboard/destinations")}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default DestinationForm;
