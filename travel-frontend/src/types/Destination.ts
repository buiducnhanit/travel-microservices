import { DestinationImage } from "./DestinationImage";

export interface Destination {
    _id: string;
    name: string;
    location: {
        country: string;
        city: string;
    };
    description: string;
    images: DestinationImage[];
}