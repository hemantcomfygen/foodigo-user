import { useFindLocalItems } from "../../hooks/useFindLocalItems";

const ItemCard = ({ item, selectedVariant, handleCartModal, handleUpdateQuantity }) => {
    const quantity = useFindLocalItems(
        item._id,
        selectedVariant?._id
    );

    //  const quantity = useSelector(state =>
    //     state.cart.items.find(
    //         i =>
    //             i.itemId === item._id &&
    //             i.variantId === selectedVariant?._id
    //     )?.quantity || 0
    // );

    return (
        <div className="flex justify-between items-start border-b border-zinc-200 pb-4 mb-4">
            <div className="pr-4">
                <p className="font-medium flex items-center gap-2">
                    {item.name}
                    <span
                        className={`text-xs px-1 border rounded ${item.food_type === "veg"
                            ? "text-green-600 border-green-600"
                            : "text-red-600 border-red-600"
                            }`}
                    >
                        {item.food_type}
                    </span>
                </p>

                <p className="mt-1 font-semibold">
                    ₹{item.base_price}
                </p>

                <p className="text-sm text-gray-500">
                    {item.description}
                </p>
            </div>

            <div className="text-center">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded object-contain mb-2"
                />

                {quantity > 0 ? (
                    <div className="flex items-center gap-2 border border-green-600 rounded px-2 py-1">
                        <button
                            className="text-green-600 font-bold px-1 cursor-pointer"
                            onClick={() => handleUpdateQuantity(item, "remove")}
                        >
                            −
                        </button>

                        <span className="text-sm font-semibold min-w-[16px] text-center">
                            {quantity}
                        </span>

                        <button
                            className="text-green-600 font-bold px-1 cursor-pointer"
                            onClick={() => handleUpdateQuantity(item, "add")}
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        className={`border px-3 py-1 rounded ${item.isInStock
                            ? "text-green-600 border-green-600 cursor-pointer"
                            : "text-red-600 border-red-600 cursor-not-allowed opacity-60"
                            }`}
                        onClick={() => handleCartModal(item)}
                        disabled={!item.isInStock}
                    >
                        {item.isInStock ? "ADD" : "Out of stock"}
                    </button>
                )}

            </div>
        </div>
    );
};


export default ItemCard;