const RestaurantCard = ({ item, handleClick }) => {
    const {
        restaurant_details,
        cover_image,
        distanceInKm,
        estimatedDeliveryTime,
        status,
    } = item;

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            {/* Cover Image */}
            <div className="relative" onClick={() => handleClick(restaurant_details.restaurant_name, restaurant_details._id)}>
                <img
                    src={cover_image || "https://thumbs.dreamstime.com/b/tasty-burger-french-fries-fire-close-up-home-made-flames-137249900.jpg"}
                    alt={restaurant_details.restaurant_name}
                    className="h-40 w-full object-cover"
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

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        ⭐ {restaurant_details.average_rating}
                    </span>
                    <span>•</span>
                    <span>{restaurant_details.total_ratings}+ ratings</span>
                </div>

                <p className="text-xs text-gray-500 truncate">
                    {restaurant_details.food_type}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-600 pt-1">
                    <span>{estimatedDeliveryTime} mins</span>
                    <span>{distanceInKm} km</span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
