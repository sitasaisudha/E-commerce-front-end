import React from 'react';
import { useContext } from "react";
import { MyContext } from '../../../context/MyContext';
import { FaSearch } from "react-icons/fa";
// import { GoHome } from "react-icons/fa";
import {MdOutlineAddShoppingCart} from "react-icons/md"
import {FaUserLarge} from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import {FaExclamation} from "react-icons/fa6";
const NavigationIcons = () => {
    const {currentPage, setCurrentpage} = useContext(MyContext);
    const handleIconChange =(icon)=>{
        setCurrentpage(icon);
    }
    return (
        <div>
             <div className='bottom-navigation'  > 
                {/* <div>{GoHome} sita </div> */}
                <a  onClick={() => handleIconChange('home')} className={currentPage === 'home' ? 'active' : ''} >  <GoHome/></a>
                <a  onClick={() => handleIconChange('cart')} className={currentPage === 'cart' ? 'active' : ''} ><MdOutlineAddShoppingCart/></a>
                <a  onClick={() => handleIconChange('login')} className={currentPage === 'login' ? 'active' : ''} ><span>  <FaUserLarge/>!</span></a>
                
                
              
             </div>
        </div>
    );
};

export default NavigationIcons;