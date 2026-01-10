import { Search, HelpCircle, User, ShoppingCart, Percent } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="w-full border-b border-zinc-200 shadow-xs bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">

                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="flex h-28 w-28 items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Swiggy_Logo_2024.webp/1143px-Swiggy_Logo_2024.webp.png" alt="logo" />
                        </div>
                    </div>
                </div>


                {/* Right Section */}
                <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
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
                    </div>

                    <Link to="/login" className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                        <User size={18} />
                        Sign In
                    </Link>

                    <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                        <ShoppingCart size={18} />
                        Cart
                        <span className="ml-1 rounded bg-orange-500 px-1.5 py-0.5 text-xs text-white">
                            0
                        </span>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
