import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";
import Home from "../../pages/home/Home";
import RestaurantDetail from "../../pages/RestaurantDetail/RestaurantDetail";
import Cart from "../../pages/cart/Cart";

const Layout = () => {

    return (
        <div className="flex flex-col h-full">
            <header className="shrink-0">
                <Header />
            </header>
            <main
                className="flex-1 overflow-y-auto px-3 
                       [&::-webkit-scrollbar]:w-0 w-full max-w-6xl mx-auto"
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/outlet/:name/:id" element={<RestaurantDetail />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>

            </main>
        </div>
    );
};

export default Layout;