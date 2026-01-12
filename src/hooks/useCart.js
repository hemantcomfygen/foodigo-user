import { notifyCartUpdate } from "./cartEvents";


export const useCart = ({
    restaurant_id,
    outlet_id,
    selectedVariant = null,
    selectedAddOns = null
}) => {

    const getCart = () =>
        JSON.parse(localStorage.getItem("cart_data")) || [];

    const saveCart = (cart) => {
        localStorage.setItem("cart_data", JSON.stringify(cart));
        notifyCartUpdate();
    };

    const getQuantity = (item_id, variant_id = null) => {
        const cart = getCart();

        const found = cart.find(
            item =>
                item.item_id === item_id &&
                (variant_id ? item.variant_id === variant_id : true)
        );

        return found ? found.quantity : 0;
    };

    const addItem = (item) => {
        const cart = getCart();

        const index = cart.findIndex(
            i =>
                i.item_id === item._id &&
                i.variant_id === (selectedVariant?._id || null)
        );

        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({
                restaurant_id,
                outlet_id,
                item_id: item._id,
                variant_id: selectedVariant?._id || null,
                add_ons: selectedAddOns || null,
                quantity: 1
            });
        }

        saveCart(cart);
    };

    const removeItem = (item) => {
        const cart = getCart();

        const index = cart.findIndex(
            i =>
                i.item_id === item._id &&
                i.variant_id === (selectedVariant?._id || null)
        );

        if (index === -1) return;

        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }

        saveCart(cart);
    };

    return {
        addItem,
        removeItem,
        getQuantity
    };
};
