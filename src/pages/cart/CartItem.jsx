const CartItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center p-5">
      <div className="flex gap-3">
        {/* Veg / Non-Veg Indicator */}
        <span
          className={`mt-1 w-3 h-3 rounded-full ${
            item.isVeg ? "bg-green-600" : "bg-red-600"
          }`}
        />

        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">₹{item.price}</p>
        </div>
      </div>

      <div className="flex items-center border rounded-md overflow-hidden">
        <button className="px-3 py-1 bg-gray-50 hover:bg-gray-100">−</button>
        <span className="px-4">{item.qty}</span>
        <button className="px-3 py-1 bg-gray-50 hover:bg-gray-100">+</button>
      </div>
    </div>
  );
};

export default CartItem;
