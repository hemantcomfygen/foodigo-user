const EmptyCart = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-4">
        Add delicious food from nearby restaurants
      </p>
      <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
        Browse Restaurants
      </button>
    </div>
  );
};

export default EmptyCart;
