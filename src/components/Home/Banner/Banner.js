import React from "react";
import "./Banner.css";
import heading from '../../../assets/images/heading.png';
import bannerImage from '../../../assets/images/bannerImage.png';

const Banner = () => {
  return (
    <div className="banner">
      <div className="heading-section">
        <img src={heading} alt="Music Art" className="heading-img"/>
        <span><b>Home</b></span>
      </div>
      <div className="banner_image">
        <img src={bannerImage} alt="" />
      </div>
    </div>
  );
};

export default Banner;