import { Customer } from "./Customer";
import { Tour } from "./Tour";

export interface Booking {
    _id: string;
    user: Customer;
    tour: Tour;
    fullName: string;
    email: string;
    phone: string;
    people: number;
    notes: string;
    status: string;
    createdAt: Date;
    userDetails: Customer;
    tourDetails: Tour;
}
