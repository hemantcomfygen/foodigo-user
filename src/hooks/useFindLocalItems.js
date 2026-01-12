import { useEffect, useState } from "react";
import { CART_UPDATED_EVENT } from "./cartEvents";

export const useFindLocalItems = (item_id, variant_id = null) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (!item_id) return;

        const updateQuantity = () => {
            const localItems = JSON.parse(
                localStorage.getItem("cart_data")
            ) || [];

            const foundItem = localItems.find(
                item =>
                    item.item_id === item_id &&
                    (variant_id ? item.variant_id === variant_id : true)
            );

            setQuantity(foundItem ? foundItem.quantity : 0);
        };

        updateQuantity(); // initial run

        window.addEventListener(CART_UPDATED_EVENT, updateQuantity);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, updateQuantity);
        };
    }, [item_id, variant_id]);

    return quantity;
};
