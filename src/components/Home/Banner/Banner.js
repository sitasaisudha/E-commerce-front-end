import React from "react";
import "./Banner.css";
import heading from '../../../assets/images/heading.png';
import bannerImage from '../../../assets/images/bannerImage.png';
import { useNavigate } from 'react-router-dom';
const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className="banner">
      <div className="heading-section">
        <div className="banner-icon">
        <img src={heading} alt="Music Art" className="heading-img"/>
        <span><b>Home</b></span>
        </div>
      
        <button className="view-cart-btn" onClick={()=>{navigate('cart-items')}}  > <i className="ri-shopping-cart-2-line"></i> View cart</button>
      </div>
      <div className="banner_image">
        <img src={bannerImage} alt="" />
      </div>
    </div>
  );
};

export default Banner;