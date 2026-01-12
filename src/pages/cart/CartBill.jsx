const CartBill = ({ items }) => {
  const itemTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const deliveryFee = 30;
  const total = itemTotal + deliveryFee;

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h3 className="font-semibold mb-4">Bill Details</h3>

      <div className="flex justify-between text-sm mb-2">
        <span>Item Total</span>
        <span>₹{itemTotal}</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span>Delivery Fee</span>
        <span>₹{deliveryFee}</span>
      </div>

      <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg">
        <span>To Pay</span>
        <span>₹{total}</span>
      </div>

      <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartBill;
