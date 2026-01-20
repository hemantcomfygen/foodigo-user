import React, { useRef } from "react";
import Slick from "react-slick";
import "./BannerSlider.css";

const Slider = Slick?.default ?? Slick;

const BannerSlider = ({ banners = [] }) => {
  const sliderRef = useRef(null);

  if (!banners.length) return null;

  const settings = {
    dots: true,
    arrows: false,
    infinite: banners.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    appendDots: (dots) => (
      <div className="banner-dots">
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="banner-slider">
      <Slider ref={sliderRef} {...settings}>
        {banners.map((banner) => (
          <div className="banner-slide" key={banner._id}>
            <img
              src={banner.image_url}
              alt={banner.title || "banner"}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
