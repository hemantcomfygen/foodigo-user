/* eslint-disable react-refresh/only-export-components */
import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";

/* ------------------ CONTEXT ------------------ */

const CartContext = createContext(null);

/* ------------------ HELPERS ------------------ */

const isSameAddOns = (a = [], b = []) =>
    JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());

/* ------------------ INITIAL STATE ------------------ */

const initialState = {
    items: [],
    lastStableState: null, // 🔐 snapshot for rollback
};

/* ------------------ REDUCER ------------------ */

function cartReducer(state, action) {
    switch (action.type) {

        case "SAVE_SNAPSHOT":
            return {
                ...state,
                lastStableState: JSON.stringify(state.items),
            };

        case "ROLLBACK":
            if (!state.lastStableState) return state;
            return {
                ...state,
                items: JSON.parse(state.lastStableState),
                lastStableState: null,
            };

        case "HYDRATE":
            return {
                ...state,
                items: action.payload || [],
                lastStableState: null,
            };

        case "ADD_ITEM": {
            const payload = action.payload;

            const index = state.items.findIndex(
                (i) =>
                    i.itemId === payload.itemId &&
                    i.variantId === payload.variantId &&
                    isSameAddOns(i.addOns, payload.addOns)
            );

            let updatedItems;

            if (index !== -1) {
                updatedItems = state.items.map((item, i) =>
                    i === index
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedItems = [
                    ...state.items,
                    { ...payload, quantity: 1 },
                ];
            }

            return {
                ...state,
                items: updatedItems,
            };
        }

        case "INCREASE_QTY":
            return {
                ...state,
                items: state.items.map((i) =>
                    i.key === action.payload
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                ),
            };

        case "DECREASE_QTY":
            return {
                ...state,
                items: state.items
                    .map((i) =>
                        i.key === action.payload
                            ? { ...i, quantity: i.quantity - 1 }
                            : i
                    )
                    .filter((i) => i.quantity > 0),
            };

        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(
                    (i) => i.key !== action.payload
                ),
            };

        case "EMPTY_CART":
            return {
                ...state,
                items: [],
            };

        default:
            return state;
    }
}


/* ------------------ PROVIDER ------------------ */

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    /* 💾 Persist cart */
    useEffect(() => {
        localStorage.setItem("cart_data", JSON.stringify(state.items));
    }, [state.items]);

    /* ♻️ Rehydrate on reload */
    useEffect(() => {
        const stored = JSON.parse(
            localStorage.getItem("cart_data")
        );
        dispatch({ type: "HYDRATE", payload: stored });
    }, []);

    /* ------------------ OPTIMISTIC EXECUTOR ------------------ */
    const optimisticAction = async (updateFn, apiFn) => {
        if (!state.lastStableState) {
            dispatch({ type: "SAVE_SNAPSHOT" });
        }

        updateFn();

        try {
            const res = await apiFn();
            if (res?.error) throw new Error();
        } catch (err) {
            dispatch({ type: "ROLLBACK" });
            throw err;
        }
    };


    /* ------------------ PUBLIC API ------------------ */

    const addItem = (payload, apiFn) =>
        optimisticAction(
            () => dispatch({ type: "ADD_ITEM", payload }),
            apiFn
        );

    const increaseQty = (key, apiFn) =>
        optimisticAction(
            () => dispatch({ type: "INCREASE_QTY", payload: key }),
            apiFn
        );

    const decreaseQty = (key, apiFn) =>
        optimisticAction(
            () => dispatch({ type: "DECREASE_QTY", payload: key }),
            apiFn
        );

    const removeItem = (key, apiFn) =>
        optimisticAction(
            () => dispatch({ type: "REMOVE_ITEM", payload: key }),
            apiFn
        );

    const emptyCart = (apiFn) =>
        optimisticAction(
            () => dispatch({ type: "EMPTY_CART" }),
            apiFn
        );

    const getItemQuantity = (itemId, variantId, addOns = []) =>
        state.items.find(
            (i) =>
                i.itemId === itemId &&
                i.variantId === variantId &&
                isSameAddOns(i.addOns, addOns)
        )?.quantity || 0;

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                addItem,
                increaseQty,
                decreaseQty,
                removeItem,
                emptyCart,
                getItemQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

/* ------------------ HOOK ------------------ */

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }
    return ctx;
};
