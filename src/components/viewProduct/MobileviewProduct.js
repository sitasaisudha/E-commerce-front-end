import {React, useState, useEffect} from 'react';
import MobileHEader from '../Home/Header/MobileHEader';
import NavigationIcons from '../Home/Footer/NavigationIcons';
import axios from 'axios';
import heading from '../../assets/images/heading.png'
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './ProductDetail.css';

const MobileviewProduct = () => {
      const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
      const navigate = useNavigate();
    
      const [data, setData] = useState({})
      const [about,setAbout] = useState([]); 
      
      useEffect(() => {
          axios.get(`http://localhost:4500/musicProducts/?_id=${localStorage.getItem("id")}`)
              .then((response) => { setData(response.data);setAbout(response.data.about) })
              .catch((err) => { console.log(err) })
      }, [])
  
      const addCart = ()=>{
          localStorage.setItem("current",JSON.stringify(data))
          const user = "21b01a12c8@svecw.edu.in"
          try {
              axios.put(`http://localhost:4500/musicProducts/${data._id}/cart/${user}`)
                  .then((response) => { 
                      console.log(response)
                  })                
          } catch (error) {
              console.log(error);
          }
  
      }
      let rate = parseInt(data.rating.rate)
      let count = parseInt(data.rating.count)
      
  
    return (
        <div>
            <MobileHEader/>
            <div className='view-product'>
                <div className='back-to-home' onClick={() => { navigate('/') }} >
                <i className="ri-arrow-left-line"></i>
                    {/* <button onClick={() => { navigate('/') }} className='back-to-home-btn' > <i className="ri-arrow-left-line"></i> </button> */}
                </div>
                <button className='buy-now' onClick={()=>{addCart();navigate('/viewCart')}} >Buy Now</button>

                {/* <div className='product-description'>
                    <p>{data.description}</p>
                </div> */}

                <div id="prodetails" className="section-p1">
                   
                     <div className='scorlling-images-section' > 

                        <div className='scrolling-image'>  <img src={data.main_image} alt=""width="100%" id="mainImg" /> </div>
                        <div className='scrolling-image'> <img src={data.left_view} alt="" width="100%" className="small-img" />  </div>
                        <div className='scrolling-image'>  <img src={data.top_view} alt="" width="100%" className="small-img" />  </div>
                        <div className='scrolling-image'>   <img src={data.right_view} alt="" width="100%" className="small-img" />  </div>
                        
                     </div>
                     
                    <div className="single-pro-details">
                        <h1>{data.name}</h1>
                        <div className='product-sub-details'>
                           
                            <p>{ [...new Array(Math.ceil(rate))].map( (e,i)=>(
                                <span key={i}>⭐</span>
                                
                            ) ) }
                            
                            ({ parseInt( data.rating["count"])}) </p>
                            <p> {count} </p>
                        </div>
                        <h3>Price - ₹ {data.price}</h3>
                        <p>{data.color} | {data.type} headphone</p>
                        <p className='details'>About this Product <br></br>
                        <ul>
                            {about.map((item,index)=>{
                                return (<li key={index}>{item}</li>)
                            })}
                        </ul>
                            
                        </p>
                        
                        <p><b>Available</b> - {data.available}</p>
                        <p><b>Brand</b> - {data.brand}</p>
                        <div className="buttons">
                        <button className='add-to-cart' onClick={()=>{addCart();navigate('/viewCart')}}>Add to Cart</button>
                       
                        </div>
                    </div>
                </div>
            </div>
            <NavigationIcons/>
        </div>
    );
};

export default MobileviewProduct;