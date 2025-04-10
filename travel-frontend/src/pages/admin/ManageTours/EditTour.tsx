import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Box, TextField, Button, Typography, IconButton, Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import useFetch from "../../../hooks/useFetch";
import { getTourById, updateTour } from "../../../services/tourService";
import { Destination } from "../../../types/Destination";
import { useParams } from "react-router-dom";

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

const EditTour: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>();
    const { fields, append, remove } = useFieldArray<FormValues, "destinations">({ control, name: "destinations" });
    const { data: destinationOptions } = useFetch<Destination[]>("/destinations");
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            getTourById(id).then((tour) => {
                if (tour) {
                    reset({
                        name: tour.name,
                        description: tour.description,
                        price: tour.price,
                        duration: tour.duration,
                        availableSlots: tour.availableSlots,
                        destinations: tour.destinations,
                        images: [],
                    });
                    if (tour.images) {
                        setPreviewImages(tour.images.map(img => img.imageUrl));
                    }
                }
            }).catch(error => {
                console.error("Error fetching tour:", error);
            });
        }
    }, [id, reset]);


    const onSubmit = async (data: FormValues) => {
        try {
            await updateTour(id!, {
                name: data.name,
                description: data.description,
                price: data.price,
                duration: data.duration,
                availableSlots: data.availableSlots,
                destinations: data.destinations.map(dest => dest._id),
            }, data.images);
            alert("Tour updated successfully!");
        } catch (error) {
            console.error("Error updating tour:", error);
            alert("Failed to update tour. Please try again.");
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setValue("images", newFiles);
            setPreviewImages(newFiles.map(file => URL.createObjectURL(file)));
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 700, margin: "auto", borderRadius: 2 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Edit Tour
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller name="name" control={control} render={({ field }) => (
                    <TextField {...field} placeholder="Tour Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />
                )} />

                <Controller name="description" control={control} render={({ field }) => (
                    <TextField {...field} placeholder="Description" multiline rows={3} fullWidth margin="normal" error={!!errors.description} helperText={errors.description?.message} />
                )} />

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Controller name="price" control={control} render={({ field }) => (
                        <TextField {...field} placeholder="Price" type="number" fullWidth margin="normal" error={!!errors.price} helperText={errors.price?.message} />
                    )} />
                    <Controller name="duration" control={control} render={({ field }) => (
                        <TextField {...field} placeholder="Duration (days)" type="number" fullWidth margin="normal" error={!!errors.duration} helperText={errors.duration?.message} />
                    )} />
                </Box>

                <Controller name="availableSlots" control={control} render={({ field }) => (
                    <TextField {...field} placeholder="Available Slots" type="number" fullWidth margin="normal" error={!!errors.availableSlots} helperText={errors.availableSlots?.message} />
                )} />

                <Typography variant="h6" fontWeight="bold" gutterBottom>Destinations</Typography>
                {fields.map((item, index) => (
                    <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 1 }}>
                        <Controller name={`destinations.${index}`} control={control} render={({ field }) => (
                            <Autocomplete
                                {...field}
                                options={destinationOptions || []}
                                getOptionLabel={(option) => option.name}
                                value={destinationOptions?.find(d => d._id === field.value?._id) || null}
                                onChange={(_, newValue) => setValue(`destinations.${index}`, newValue || { _id: "", name: "", location: { country: "", city: "" }, description: "", images: [] })}
                                renderInput={(params) => <TextField {...params} label="Destination" fullWidth />}
                                sx={{width: 1}}
                            />
                        )} />
                        <IconButton onClick={() => remove(index)} color="error"><RemoveCircleIcon /></IconButton>
                    </Box>
                ))}
                <Button startIcon={<AddCircleIcon />} onClick={() => append({ _id: "", name: "", location: { country: "", city: "" }, description: "", images: [] })} fullWidth>
                    Add Destination
                </Button>

                <Typography variant="h6" fontWeight="bold" gutterBottom>Upload Images</Typography>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                    {previewImages.map((image, index) => (
                        <img key={index} src={image} alt="Preview" style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 5 }} />
                    ))}
                </Box>

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Update Tour
                </Button>
            </form>
        </Paper>
    );
};

export default EditTour;
