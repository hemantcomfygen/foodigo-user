import React from "react";
import "./Loader.css";

const Loader = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="loader-backdrop">
            <div class="three-body">
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
            </div>
        </div>
    );
};

export default Loader;
