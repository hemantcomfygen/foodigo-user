import React from "react";
import CuisineRestaurantCard from "../../components/CuisineRestaurantCard";

const CuisineRestaurants = () => {
  return (
    <div className="px-6 py-4">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Cake</h2>
        <p className="text-gray-500">
          Feast on amazing cakes to satisfy your sweet tooth
        </p>
      </div>

      {/* GRID */}
      <div className="flex flex-wrap gap-6">
        <CuisineRestaurantCard
          image="https://www.foodandwine.com/thmb/XE8ubzwObCIgMw7qJ9CsqUZocNM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg"
          offerText="ITEMS AT ₹79"
          name="Firangi Bake"
          average_rating={4}
          total_ratings={120}
          prepare_time={{ min: 30, max: 35 }}
          cuisines={["Pizzas", "Pastas", "Italian", "Mexican"]}
          area="Bais Godam"
        />
      </div>
    </div>
  );
};

export default CuisineRestaurants;
