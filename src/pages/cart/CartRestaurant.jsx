const CartRestaurant = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h2 className="text-lg font-semibold">{restaurant.name}</h2>
      <p className="text-sm text-gray-500 mt-1">
        {restaurant.area} • {restaurant.distance}
      </p>

      <button className="text-orange-500 text-sm font-medium mt-2">
        Change Restaurant
      </button>
    </div>
  );
};

export default CartRestaurant;
