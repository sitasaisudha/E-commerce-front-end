import React, { useState, useEffect } from "react";
import Header from '../Home/Header/Header';
import { useNavigate } from 'react-router-dom';
import heading from '../../assets/images/heading.png'
import './ViewCart.css';
import axios from "axios";
import Footer from "../Home/Footer/Footer";
// import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import MobileHEader from "../Home/Header/MobileHEader";
import NavigationIcons from "../Home/Footer/NavigationIcons";



const Cart = () => {
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'});
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const user = localStorage.getItem("user");
    // const user = "21b01a12c8@svecw.edu.in";
    const [totalItems, setTotalItems] = useState(0);
    let final_amount = 0;

    const placeOrder =(item, amnt)=>{
        localStorage.setItem("current",JSON.stringify(item));
        localStorage.setItem("total", amnt);
        navigate('/checkout');
       
    }
    useEffect(() => {
        axios.get(`http://localhost:4500/musicProducts/getCart/${user}`)
            .then((response) => { 
                setData(response.data);
                console.log(response);
                setTotalItems(response.data.length);
            })
            .catch((err) => { console.log("error sita ..", err) })
    }, [])
    
    return (
        <div className="cart-page">
          
            {isDesktopOrLaptop ? <Header/>:<MobileHEader/> }

            {isDesktopOrLaptop ?
                        <div className='cart-section'>
                        <div className='heading'>
                                <div className="heading-section">
                                    <img src={heading} alt="Music Art" className="heading-img" />
                                    <p><b>Home/View Cart</b></p>
                                </div>
                                <div>
                                    <button>cart</button>
                                </div>
                        </div>
                        <div className='back-to-home'>
                                <button onClick={() => { navigate('/') }}>Back to Products</button>
                        </div>
                        <center><div className='cart-symbol'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 62 59" fill="none">
                                    <path d="M56.3916 14.0979H44.6434C44.6434 10.3589 43.158 6.77305 40.5142 4.12918C37.8703 1.48531 34.2845 0 30.5455 0C26.8065 0 23.2206 1.48531 20.5767 4.12918C17.9329 6.77305 16.4476 10.3589 16.4476 14.0979H4.6993C3.45297 14.0979 2.25768 14.593 1.37639 15.4743C0.495103 16.3556 0 17.5509 0 18.7972V54.042C0 55.2883 0.495103 56.4836 1.37639 57.3649C2.25768 58.2462 3.45297 58.7413 4.6993 58.7413H56.3916C57.6379 58.7413 58.8332 58.2462 59.7145 57.3649C60.5958 56.4836 61.0909 55.2883 61.0909 54.042V18.7972C61.0909 17.5509 60.5958 16.3556 59.7145 15.4743C58.8332 14.593 57.6379 14.0979 56.3916 14.0979ZM30.5455 4.6993C33.0381 4.6993 35.4287 5.68951 37.1913 7.45209C38.9538 9.21467 39.9441 11.6052 39.9441 14.0979H21.1469C21.1469 11.6052 22.1371 9.21467 23.8996 7.45209C25.6622 5.68951 28.0528 4.6993 30.5455 4.6993ZM56.3916 54.042H4.6993V18.7972H16.4476V23.4965C16.4476 24.1197 16.6951 24.7173 17.1357 25.158C17.5764 25.5986 18.174 25.8462 18.7972 25.8462C19.4204 25.8462 20.018 25.5986 20.4587 25.158C20.8993 24.7173 21.1469 24.1197 21.1469 23.4965V18.7972H39.9441V23.4965C39.9441 24.1197 40.1916 24.7173 40.6323 25.158C41.0729 25.5986 41.6705 25.8462 42.2937 25.8462C42.9169 25.8462 43.5145 25.5986 43.9552 25.158C44.3958 24.7173 44.6434 24.1197 44.6434 23.4965V18.7972H56.3916V54.042Z" fill="black" />
                                </svg>
                                <h3>My Cart</h3>
            
                            </div>
                        </center>
                        <div >
                           
                               { data.map((item,index)=>{
                                    
                                    {final_amount =  final_amount + (totalItems * item.price) + 45}
                                    return(
                                        <div className='cart-product-details' key={index} >
                                        {/* <div className='product-specs'>
                                            
                                                <img src={item.main_image} alt="" />
                                            
                                            <div>
                                                <h3>{item.name}</h3><br></br>
                                                <p>Colour : {item.color}</p><br></br>
                                                <p>{item.available}</p>
                                            </div>
                                            <div>
                                                <p><b>Price</b></p><br></br>
                                                <p>₹ {item.price}</p>
                                            </div>
                                            <div>
                                                <label><b>Quantity:</b></label><br></br><br></br>
                                                <select
                                                    onChange={(e) => setTotalItems(e.target.value) }
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                </select>
                                            </div>
                                            <div>
                                                <p><b>Total</b></p><br></br>
                                                <p>{totalItems * item.price}</p>
                                            </div>
                                        </div> */}
                                        <div className="sita">
                                        <img src={item.main_image} alt="" />
                                        <table className="tabu"  >
                                           
                                            <tbody>
                                                <tr>
                                                  
                                                    <td>
                                                        <h3>{item.name}</h3><br></br>
                                                        
                                                    </td>
                                                    <td>
                                                        <p><b>Price</b></p><br></br>
                                                        

                                                    </td>
                                                    <td>
                                                    <label><b>Quantity:</b></label><br></br><br></br>
                                               
                                                    </td>
                                                    <td>
                                                    <p><b>Total</b></p><br></br>
                                            
                                                    </td>
                                                </tr>
                                                <tr>
                                                   
                                                    <td> <p>Colour : {item.color}</p><br></br>
                                                        <p>{item.available}</p>
                                                     </td>
                                                    <td>
                                                         <p>₹ {item.price}</p>
                                                    </td>
                                                    <td>
                                                    <select
                                                    onChange={(e) => setTotalItems(e.target.value) }
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                </select>
                                                     </td>
                                                    <td>
                                                    <p>{totalItems * item.price}</p>
                                                         </td>
                                                         
                                                </tr>
                                            </tbody>
                                        </table>

                                        </div>
                                        <div>
                                           <table className='table-details'>
                                            <thead>
                                                <tr><td><b>PRICE DETAILS</b></td></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Total MRP</td>
                                                    <td>₹{totalItems * item.price}</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount on MRP</td>
                                                    <td>₹0</td>
                                                </tr>
                                                <tr>
                                                    <td>Convenience Fee</td>
                                                    <td>₹45</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr><td><b>Total Amount</b></td><td>₹ {totalItems * item.price + 45}</td></tr>
                                                {/* <tr> <button className='buy-now' onClick={()=>{localStorage.setItem("total",totalItems * item.price +45 ); }} >Place order</button></tr> */}
                                                <tr> <button className='buy-now' onClick={()=>{placeOrder(item, totalItems * item.price + 45)}} >Place order</button></tr>
            
                                            </tfoot>
                                           </table>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                            
                        </div>
                        <h3> Final amount = {final_amount}</h3>
                        
            
                        </div>
                        
                        :
                        
                        
                        
                        
                        <div>
                             <div className='back' onClick={() => { navigate('/') }} >
                                    <br></br>
                                        <i className="ri-arrow-left-line"></i>
                                         </div>
                            {
                                data.map((item,index)=>{
                                    return(
                                    // <div>
                                         
                                    <div className='mob-cart-container'>
                                      
                                    <div className='mobile-cart-view'>
                                    
                                    <div>
                                    <img className='mobile-cart-img' src={item.main_image} alt="" />
                                    </div>
                        
                                    <div className='mob-cart-details'>
                                       
                                        <div>
                                            
                                            <h3> { item.name}</h3>
                                            <h3> { item.price}</h3>
                                            <p>color : {item.color}</p>
                                            <p> {item.available}</p>
                                            <p>Convienience fee : 45</p>
                        
                        
                        
                                        </div>
                                        <div>
                                           <b> Total :₹ {totalItems * item.price + 45} </b>
                                        </div>
                                    </div>
                        
                                    </div>
                                    <hr></hr>
                                    <div className='mob-cart-sub-details'> 
                                    <h3>Total amount :₹ {totalItems * item.price + 45}</h3>
                                    <button className='buy-now' onClick={()=>{placeOrder()}} >PLACE ORDER</button>
                                  
                                     </div>
                                    
                                    </div>
                                    // </div>
                                    )
                                })
                            }
                            
                            
                        </div>}
                        

                

</div>
)}

export default Cart;