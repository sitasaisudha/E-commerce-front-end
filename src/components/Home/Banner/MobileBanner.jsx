import React from 'react';
import bannerImage from '../../../assets/images/bannerImage.png';
const MobileBanner = () => {
    return (
        <div className="banner_image">
            <img src={bannerImage} alt="banner image"   />
        </div>
    );
};

export default MobileBanner;