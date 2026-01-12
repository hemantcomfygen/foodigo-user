/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOutlets, getFoodItems } from "../../redux/slices/AuthSlice";
import Button from "../../components/Button/Button";
import Modal from "../../components/modal/Modal";
import ItemCard from "./ItemCard";
import { notifyCartUpdate } from "../../hooks/cartEvents";

const RestaurantDetail = () => {
    const { id } = useParams(); // restaurant_id
    const dispatch = useDispatch();
    const [selectedOutletId, setSelectedOutletId] = useState(null);
    const [items, setItems] = useState(null)
    const [isCartModal, setIsCartModal] = useState(false)
    const [step, setStep] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedAddOns, setSelectedAddOns] = useState([]);

    const selector = useSelector((state) => state.auth);

    const outletData =
        selector?.getAllOutletsData?.data?.data?.list || [];

    const categories =
        selector?.getFoodItemsData?.data?.data?.category || [];

    const hasVariants = items?.variants?.length > 0;
    const hasAddOns = items?.add_ons?.length > 0;




    useEffect(() => {
        dispatch(
            getAllOutlets({
                query: { restaurant_id: id },
                populate:
                    "restaurant_id:restaurant_name,total_ratings,average_rating,cuisines"
            })
        );

        dispatch(getFoodItems({ restaurant_id: id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (outletData.length && !selectedOutletId) {
            setSelectedOutletId(outletData[0]._id);
        }
    }, [outletData, selectedOutletId]);

    useEffect(() => {
        if (items?.variants?.length) {
            const defaultVariant = items.variants
                .flatMap(v => v.options)
                .find(o => o.is_default);

            if (defaultVariant) {
                setSelectedVariant(defaultVariant);
            }
        }
    }, [items]);

    useEffect(() => {
        if (!hasVariants && hasAddOns) {
            setStep(2);
        }
    }, [hasVariants, hasAddOns]);

    const toggleAddon = (option) => {
        setSelectedAddOns((prev) => {
            if (prev.includes(option._id)) {
                return prev.filter(id => id !== option._id);
            }
            return [...prev, option._id];
        });
    };

    const handleOutletChange = (e) => {
        const outletId = e.target.value;
        setSelectedOutletId(outletId);

        dispatch(
            getFoodItems({
                restaurant_id: id,
                outlet_id: outletId
            })
        );
    };

    const outlet =
        outletData.find((o) => o._id === selectedOutletId) ||
        outletData[0];

    const restaurant = outlet?.restaurant_id;

    if (!outlet || !restaurant) {
        return (
            <p className="text-center text-gray-500 py-10">
                Loading restaurant details...
            </p>
        );
    }

    const handleCartModal = (data) => {
        const hasVariantsLocal = data?.variants?.length > 0;
        const hasAddOnsLocal = data?.add_ons?.length > 0;
        const shouldSkip = !hasVariantsLocal && !hasAddOnsLocal;

        if (shouldSkip) {
            console.log("Direct Add:", {
                item: data,
                price: data.base_price,
            });
        }

        setItems(data);
        setSelectedVariant(null);
        setSelectedAddOns([]);

        setStep(hasVariantsLocal ? 1 : 2);
        setIsCartModal(true);
    };

    const handleCloseCartModal = () => {
        setIsCartModal(false)
        setItems(null)
    }

    const handleAddToCart = (data) => {
        const cartItem = {
            restaurant_id: id,
            outlet_id: selectedOutletId,
            item_id: data?._id,
            variant_id: selectedVariant?._id || null,
            add_ons: selectedAddOns || null,
            quantity: 1
        };

        const existingCart = JSON.parse(localStorage.getItem("cart_data")) || [];

        const index = existingCart.findIndex(
            item =>
                item.item_id === cartItem.item_id &&
                item.variant_id === cartItem.variant_id
        );

        if (index !== -1) {
            existingCart[index].quantity += 1;
        } else {
            existingCart.push(cartItem);
        }

        localStorage.setItem("cart_data", JSON.stringify(existingCart));

        notifyCartUpdate();
        setIsCartModal(false)
    };

    const handleUpdateQuantity = (item, action) => {
        const cart = JSON.parse(localStorage.getItem("cart_data")) || [];

        const index = cart.findIndex(
            i =>
                i.item_id === item._id &&
                i.variant_id === (selectedVariant?._id || null)
        );

        if (action === "add") {
            if (index !== -1) {
                cart[index].quantity += 1;
            } else {
                cart.push({
                    restaurant_id: id,
                    outlet_id: selectedOutletId,
                    item_id: item._id,
                    variant_id: selectedVariant?._id || null,
                    add_ons: selectedAddOns || null,
                    quantity: 1
                });
            }
        }

        if (action === "remove" && index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
        }

        localStorage.setItem("cart_data", JSON.stringify(cart));
        notifyCartUpdate();
    };

    const calculateTotalPrice = () => {
        if (!items) return 0;

        // 1️⃣ Base or Variant price
        const basePrice = selectedVariant?.price ?? items.base_price ?? 0;

        // 2️⃣ Add-ons total
        let addOnsTotal = 0;

        if (items.add_ons?.length && selectedAddOns.length) {
            items.add_ons.forEach(addon => {
                addon.options.forEach(option => {
                    if (selectedAddOns.includes(option._id)) {
                        addOnsTotal += option.price || 0;
                    }
                });
            });
        }

        return basePrice + addOnsTotal;
    };

    return (
        <>
            <div className="px-4 py-6">

                <div className="pb-4 mb-6 ">
                    <div className="flex gap-4 items-start">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                                src={outlet.logo_image}
                                alt={restaurant.restaurant_name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl font-bold">
                                {restaurant.restaurant_name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1">
                                <div className="flex items-center gap-2">
                                    <span className="bg-green-600 text-white px-2 py-0.5 rounded">
                                        ⭐ {restaurant.average_rating || 0}
                                    </span>
                                    <span className="px-2 py-0.5 rounded">
                                        ({restaurant.total_ratings || 0})
                                    </span>
                                </div>
                                <span>
                                    • {outlet.capacity?.estimatedDeliveryTime} mins
                                </span>

                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                {restaurant.cuisines?.length
                                    ? "Multiple cuisines"
                                    : "Cuisine not available"}
                            </p>

                            <div className="mt-2">
                                <select
                                    value={selectedOutletId || ""}
                                    onChange={handleOutletChange}
                                    className="border rounded-md px-2 py-1 text-sm w-full max-w-sm"
                                >
                                    {outletData.map((o) => (
                                        <option key={o._id} value={o._id}>
                                            {o.name} — {o.address?.full_address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 border-b border-zinc-300 pb-2 mb-6 text-sm font-medium sticky top-0 bg-white z-10 overflow-x-auto">
                    <h2 className="font-semibold text-md">Menu</h2>
                </div>

                <div className="space-y-10">
                    {categories.map((category) => (
                        <div key={category._id} id={category._id}>
                            <h2 className="text-lg font-semibold mb-4">
                                {category.name}
                            </h2>

                            {category.items.map((item) => (
                                <ItemCard
                                    key={item._id}
                                    item={item}
                                    selectedVariant={selectedVariant}
                                    handleCartModal={handleCartModal}
                                    handleUpdateQuantity={handleUpdateQuantity}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isCartModal}
                onClose={handleCloseCartModal}
                title="Customize as per your taste"
                showActionButton={false}
            >
                <div className="mb-4">
                    <h3 className="text-sm font-medium">
                        {items?.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                        ₹{calculateTotalPrice()}
                    </p>
                </div>

                {step === 1 && (
                    <>
                        <p className="text-sm font-medium mb-3">
                            Choose your size
                        </p>

                        <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                            {items?.variants?.map((variant) => (
                                <div key={variant._id} className="space-y-2">
                                    {variant.options.map((option) => (
                                        <label
                                            key={option._id}
                                            className="flex items-center justify-between p-3 bg-white rounded-md border border-zinc-200 shadow-xs cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="variant"
                                                    checked={selectedVariant?._id === option._id}
                                                    onChange={() => setSelectedVariant(option)}
                                                />
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {variant.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {option.label}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-sm font-medium">
                                                ₹{option.price}
                                            </p>
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        {items?.add_ons && (
                            <p className="text-sm font-medium mb-3">
                                Add extra toppings
                            </p>
                        )}

                        <div className="space-y-4">
                            {items?.add_ons?.map((addon) => (
                                <div key={addon._id} className="space-y-2">
                                    <p className="text-sm font-medium mb-2">
                                        {addon.title}
                                    </p>

                                    {addon.options.map((option) => (
                                        <label
                                            key={option._id}
                                            className="flex items-center justify-between p-3 border border-zinc-200 shadow-xs rounded-md cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAddOns.includes(option._id)}
                                                    onChange={() => toggleAddon(option)}
                                                />
                                                <p className="text-sm">
                                                    {option.label}
                                                </p>
                                            </div>

                                            <p className="text-sm font-medium">
                                                ₹{option.price}
                                            </p>
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-300">
                    <p className="text-sm font-medium">
                        Step {hasVariants && hasAddOns ? step : 1}/
                        {hasVariants && hasAddOns ? 2 : 1}
                    </p>

                    {step === 1 && hasVariants ? (
                        <button
                            onClick={() => setStep(2)}
                            className="bg-green-600 text-white px-6 py-2 rounded-md text-sm"
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            onClick={() => handleAddToCart(items)}
                            className="bg-green-600 text-white px-6 py-2 rounded-md text-sm"
                        >
                            Add Item
                        </button>
                    )}
                </div>
            </Modal>

        </>
    );
};

export default RestaurantDetail;
