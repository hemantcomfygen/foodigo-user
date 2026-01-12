/* eslint-disable no-undef */
import { ShoppingCart, Percent } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../redux/slices/AuthSlice";
import { CART_UPDATED_EVENT } from "../../hooks/cartEvents";

const Header = () => {
    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");
    const user_data = useSelector((state) => state?.auth?.getUserInfoData?.data?.data)
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (user_id) {
            dispatch(getUserInfo({
                query: JSON.stringify({ _id: user_id }),
                select: "full_name"
            }));
        }
    }, [dispatch, user_id])

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart_data")) || [];
            setCartCount(cart.length);
        };

        updateCartCount();

        window.addEventListener(CART_UPDATED_EVENT, updateCartCount);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, updateCartCount);
        };
    }, []);

    return (
        <header className="w-full border-b border-zinc-200 shadow-xs bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">

                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 cursor-pointer">
                        <div className="flex h-28 w-28 items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Swiggy_Logo_2024.webp/1143px-Swiggy_Logo_2024.webp.png" alt="logo" />
                        </div>
                    </Link>
                </div>


                {/* Right Section */}
                <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
                    {/* <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                        <Percent size={18} />
                        <span className="relative">
                            Offers
                            <span className="absolute -top-2 -right-4 text-[10px] text-orange-500 font-bold">
                                NEW
                            </span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                        <HelpCircle size={18} />
                        Help
                    </div> */}


                    <UserMenu user_id={user_id} user_data={user_data} />


                    <Link to="/cart" className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                        <ShoppingCart size={18} />
                        Cart
                        <span className="ml-1 rounded bg-orange-500 px-1.5 py-0.5 text-xs text-white">
                            {cartCount || 0}
                        </span>
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default Header;
