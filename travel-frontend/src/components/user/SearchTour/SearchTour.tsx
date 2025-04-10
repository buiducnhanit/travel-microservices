/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { searchTours } from "../../../services/tourService";

const SearchTour = ({ onSearch }: { onSearch: (filters: any) => void }) => {
    const [searchText, setSearchText] = useState("");
    const [destination, setDestination] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minDays, setMinDays] = useState("");
    const [maxDays, setMaxDays] = useState("");
    const [requiredSlots, setRequiredSlots] = useState("");

    const handleSearch = async () => {
        try {
            const filters = {
                searchText,
                destination,
                minPrice,
                maxPrice,
                minDays,
                maxDays,
                requiredSlots,
            };
            const data = await searchTours(filters);
            onSearch(data);
        } catch (error) {
            console.error("Search error:", error);
        }
    };


    return (
        <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-xl">
            <input
                type="text"
                placeholder="Search tour name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="p-2 border rounded-lg"
            />
            <input
                type="text"
                placeholder="Destination ID..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="p-2 border rounded-lg"
            />
            <div className="flex gap-2">
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="p-2 border rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="p-2 border rounded-lg"
                />
            </div>
            <div className="flex gap-2">
                <input
                    type="number"
                    placeholder="Min Days"
                    value={minDays}
                    onChange={(e) => setMinDays(e.target.value)}
                    className="p-2 border rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Max Days"
                    value={maxDays}
                    onChange={(e) => setMaxDays(e.target.value)}
                    className="p-2 border rounded-lg"
                />
            </div>
            <input
                type="number"
                placeholder="Required Slots"
                value={requiredSlots}
                onChange={(e) => setRequiredSlots(e.target.value)}
                className="p-2 border rounded-lg"
            />
            <button onClick={handleSearch} className="bg-yellow-500 text-white p-2 rounded-lg">
                Search
            </button>
        </div>
    );
};

export default SearchTour;
