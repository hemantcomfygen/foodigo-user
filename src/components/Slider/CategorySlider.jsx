import React, { useRef } from "react";
import Slick from "react-slick";
import "./CategorySlider.css";

const Slider = Slick?.default ?? Slick;

const CategorySlider = ({ heading, items = [] }) => {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        arrows: false, // we use custom arrows
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };

    return (
        <div className="category-slider">
            {/* HEADER */}
            <div className="slider-header">
                <h2>{heading}</h2>

                <div className="nav-buttons">
                    <button onClick={() => sliderRef.current?.slickPrev()}>
                        ‹
                    </button>
                    <button onClick={() => sliderRef.current?.slickNext()}>
                        ›
                    </button>
                </div>
            </div>

            {/* SLIDER */}
            <Slider ref={sliderRef} {...settings}>
                {items.map((item, index) => (
                    <div className="category-item cursor-pointer" key={index}>
                        <div className="image-wrapper">
                            <img src={item?.image_url || "https://img.freepik.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"} alt={item?.name} />
                        </div>
                        <p className="text-xl font-medium text-zinc-700 tracking-wider">{item?.name}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategorySlider;
