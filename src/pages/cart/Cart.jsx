import React, { useState } from "react";
import CartItem from "./CartItem";
import CartBill from "./CartBill";
import CartRestaurant from "./CartRestaurant";
import EmptyCart from "./EmptyCart";

const cartData = {
  restaurant: {
    id: "res_123",
    name: "Burger Junction",
    area: "Sector 18, Noida",
    distance: "2.4 km",
  },
  items: [
    {
      id: "item_1",
      name: "Veg Cheese Burger",
      price: 129,
      qty: 1,
      isVeg: true,
    },
    {
      id: "item_2",
      name: "French Fries (Medium)",
      price: 99,
      qty: 2,
      isVeg: true,
    },
    {
      id: "item_3",
      name: "Chicken Burger",
      price: 179,
      qty: 1,
      isVeg: false,
    },
  ],
};

const Cart = () => {
  const [cart] = useState(cartData);

  if (!cart?.items?.length) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-4">
            <CartRestaurant restaurant={cart.restaurant} />

            <div className="bg-white rounded-lg shadow-sm divide-y">
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:sticky  h-fit">
            <CartBill items={cart.items} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
