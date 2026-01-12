export const CART_UPDATED_EVENT = "cart_updated";

export const notifyCartUpdate = () => {
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};