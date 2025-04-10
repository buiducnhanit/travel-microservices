import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, IconButton, Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import useFetch from "../../../hooks/useFetch";
import { createTour } from "../../../services/tourService";
import { Destination } from "../../../types/Destination";

interface FormValues {
    name: string;
    description: string;
    price: number;
    duration: number;
    availableSlots: number;
    destinations: Destination[];
    status: string;
    images: File[];
}

const initialFormValues: FormValues = {
    name: "",
    description: "",
    price: 0,
    duration: 1,
    availableSlots: 1,
    destinations: [],
    status: "Active",
    images: [],
};

const CreateTour: React.FC = () => {
    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { data: destinationOptions, error: fetchError } = useFetch<Destination[]>("/destinations");
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
        if (formData.images.length > 0) {
            const previews = formData.images.map((file) => URL.createObjectURL(file));
            setPreviewImages(previews);
        }
    }, [formData.images]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "price" || name === "duration" || name === "availableSlots" ? Number(value) : value });
    };

    const handleDestinationChange = (index: number, value: Destination | null) => {
        const updatedDestinations = [...formData.destinations];
        if (value) {
            updatedDestinations[index] = value;
        } else {
            updatedDestinations[index] = {
                _id: "",
                name: "",
                location: { country: "", city: "" },
                description: "",
                images: [],
            };
        }
        setFormData({ ...formData, destinations: updatedDestinations });
    };

    const handleAddDestination = () => {
        setFormData({ ...formData, destinations: [...formData.destinations, { _id: "", name: "", location: { country: "", city: "" }, description: "", images: [] }] });
    };

    const handleRemoveDestination = (index: number) => {
        const updatedDestinations = [...formData.destinations];
        updatedDestinations.splice(index, 1);
        setFormData({ ...formData, destinations: updatedDestinations });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setFormData({ ...formData, images: fileArray });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Tour name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
        if (formData.duration <= 0) newErrors.duration = "Duration must be at least 1 day";
        if (formData.availableSlots <= 0) newErrors.availableSlots = "At least 1 slot is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await createTour(
                {
                    name: formData.name,
                    description: formData.description,
                    price: formData.price,
                    duration: formData.duration,
                    availableSlots: formData.availableSlots,
                    destinations: formData.destinations.map(dest => dest._id),
                },
                formData.images
            );

            console.log("Tour created successfully:", response);
            alert("Tour created successfully!");
            setFormData(initialFormValues);
            setPreviewImages([]);
        } catch (error) {
            console.error("Error creating tour:", error);
            alert("Failed to create tour. Please try again.");
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 700, margin: "auto", borderRadius: 2 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Add New Tour
            </Typography>

            {fetchError && <Typography color="error">{fetchError}</Typography>}

            <form onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    label="Tour Name"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                />

                <TextField
                    name="description"
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                    margin="normal"
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                    <TextField
                        name="duration"
                        label="Duration (days)"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.duration}
                        onChange={handleChange}
                        error={!!errors.duration}
                        helperText={errors.duration}
                    />
                </Box>

                <TextField
                    name="availableSlots"
                    label="Available Slots"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={formData.availableSlots}
                    onChange={handleChange}
                    error={!!errors.availableSlots}
                    helperText={errors.availableSlots}
                />

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Destinations
                </Typography>

                {formData.destinations.map((destination, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        <Autocomplete
                            options={destinationOptions || []}
                            getOptionLabel={(option) => option.name}
                            value={destinationOptions?.find(d => d._id === destination._id) || null}
                            onChange={(_, newValue) => handleDestinationChange(index, newValue)}
                            isOptionEqualToValue={(option, value) => option._id === value._id}
                            renderInput={(params) => <TextField {...params} label="Destination" fullWidth />}
                        />
                        <IconButton color="error" onClick={() => handleRemoveDestination(index)}>
                            <RemoveCircleIcon />
                        </IconButton>
                    </Box>
                ))}

                <Button
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                    onClick={handleAddDestination}
                    sx={{ mb: 2 }}
                >
                    Add Destination
                </Button>

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Upload Images
                </Typography>
                <Button variant="contained" component="label">
                    Upload
                    <input type="file" hidden multiple onChange={handleImageChange} />
                </Button>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                    {previewImages.map((src, idx) => (
                        <img key={idx} src={src} alt={`Preview ${idx}`} width={100} height={100} style={{ objectFit: "cover", borderRadius: 8 }} />
                    ))}
                </Box>

                <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
                    Create Tour
                </Button>
            </form>
        </Paper>
    );
};

export default CreateTour;
