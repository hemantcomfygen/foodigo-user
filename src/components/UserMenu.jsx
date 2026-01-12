import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const UserMenu = ({ user_id, user_data }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setOpen(false);
        window.location.reload();
    };

    if (!user_id) {
        return (
            <Link
                to="/login"
                className="flex items-center gap-2 cursor-pointer hover:text-orange-500"
            >
                <User size={18} />
                Sign In
            </Link>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            {/* Trigger */}
            <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 cursor-pointer hover:text-orange-500 select-none"
            >
                <User size={18} />
                <h3 className="text-md font-medium">
                    {user_data?.full_name || "User"}
                </h3>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg border z-50">
                    <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        Profile
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                        <LogOut size={14} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
