import { createSlice} from "@reduxjs/toolkit";
import { createApiThunkPrivate, createExtraReducersForThunk } from "../../utils/apiThunk";

const initialState = {
    addToCartData: {},
    restaurantId: null,
    outletId: null,
    items: [],
    lastStableState: null,
    syncStatus: "idle",
};

export const addToCart = createApiThunkPrivate('addToCart', '/cart/add-to-cart', 'POST')


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.lastStableState = JSON.stringify(state.items);

            const { restaurantId, outletId, item } = action.payload;

            if (state.restaurantId && state.restaurantId !== restaurantId) {
                state.items = [];
            }

            state.restaurantId = restaurantId;
            state.outletId = outletId;

            const existing = state.items.find(
                i =>
                    i.itemId === item.itemId &&
                    i.variantId === item.variantId &&
                    JSON.stringify(i.addOns) === JSON.stringify(item.addOns)
            );

            if (existing) {
                existing.quantity += 1;
                existing.needsSync = true;
            } else {
                state.items.push({
                    ...item,
                    quantity: 1,
                    needsSync: true   // 👈 IMPORTANT
                });
            }
        },

        removeItem(state, action) {
            state.lastStableState = JSON.stringify(state.items);
            state.items = state.items.filter(i => i.itemId !== action.payload);
        },

        increaseQty(state, action) {
            state.lastStableState = JSON.stringify(state.items);
            const item = state.items.find(i => i.itemId === action.payload);
            if (item) item.quantity += 1;
        },

        decreaseQty(state, action) {
            state.lastStableState = JSON.stringify(state.items);
            const item = state.items.find(i => i.itemId === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },

        rollbackCart(state) {
            if (state.lastStableState) {
                state.items = JSON.parse(state.lastStableState);
                state.lastStableState = null;
            }
        },

        clearCart() {
            return initialState;
        }
    },

    extraReducers: (builder) => {
        createExtraReducersForThunk(builder, addToCart, 'addToCartData')
    }
});

export const {
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    rollbackCart,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
