import { MdStars } from "react-icons/md";
import { formatCount } from "../utils/GlobleFunction";

const RestaurantCard = ({ item, handleClick }) => {
    const {
        restaurant_details,
        cover_image,
        distanceInKm,
        status,
    } = item;
    
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer">
            {/* Cover Image */}
            <div className="relative" onClick={() => handleClick(restaurant_details.restaurant_name, restaurant_details._id)}>
                <img
                    src={cover_image ||item?.food_item?.image || "https://thumbs.dreamstime.com/b/tasty-burger-french-fries-fire-close-up-home-made-flames-137249900.jpg"}
                    alt={restaurant_details.restaurant_name}
                    className="h-40 w-full object-fill"
                />

                {status !== "open" && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-semibold">
                        Closed
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-3 space-y-1">
                <h3 className="font-semibold text-base truncate">
                    {restaurant_details.restaurant_name || "N/A"}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <span className="flex items-center gap-1 text-sm">
                        <MdStars className="text-green-800 h-5 w-5" /> {restaurant_details.average_rating} ({formatCount(restaurant_details.total_ratings)})
                    </span>
                    <span>•</span>
                    <span>{restaurant_details.preparation_time_min} min</span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-800 pt-1">
                    <span className="">Distance : {distanceInKm} km</span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
