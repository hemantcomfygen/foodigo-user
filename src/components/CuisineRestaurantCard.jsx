import React from "react";
import { formatCount } from "../utils/GlobleFunction";
import { MdStars } from "react-icons/md";

const CuisineRestaurantCard = ({
    image,
    offerText,
    name,
    total_ratings,
    average_rating,
    prepare_time,
    cuisines,
    area,
}) => {
    return (
        <div className="w-70 cursor-pointer shadow-xs border border-zinc-100 rounded-xl p-4">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-45 object-cover"
                />

                {/* Offer Badge */}
                {offerText && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm font-semibold px-2 py-1 rounded">
                        {offerText}
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="mt-2">
                <h3 className="font-semibold text-lg truncate">{name}</h3>

                <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <span className="flex items-center gap-1 text-sm">
                        <MdStars className="text-green-800 h-5 w-5" /> {average_rating} ({formatCount(total_ratings)})
                    </span>
                    <span>•</span>
                    <span>{prepare_time.min - prepare_time.max} min</span>
                </div>

                <p className="text-gray-500 text-sm truncate mt-1">
                    {cuisines.join(", ")}
                </p>

                <p className="text-gray-500 text-sm">{area}</p>
            </div>
        </div>
    );
};

export default CuisineRestaurantCard;
