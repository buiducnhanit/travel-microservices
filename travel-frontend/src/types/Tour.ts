import { Destination } from "./Destination";
import { TourImage } from "./TourImage";

export interface Tour {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    availableSlots: number;
    images: TourImage[];
    destinations: Destination[];
}
