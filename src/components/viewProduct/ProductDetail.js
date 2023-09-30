import React, { useEffect, useState } from 'react';
import Header from '../Home/Header/Header';
import './ProductDetail.css';
import heading from '../../assets/images/heading.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Home/Footer/Footer';


const ProductDetail = () => {
    const navigate = useNavigate();
    
    const [data, setData] = useState({})
    const [about,setAbout] = useState([]); 
    const[rate,setRate] = useState();
    const[count,setCount] = useState()
    useEffect(() => {
        axios.get(`http://localhost:4500/musicProducts/?_id=${localStorage.getItem("id")}`)
            .then((response) => { 
                setData(response.data);
                setAbout(response.data.about); 
                const fetched_rate =  parseInt(response.data.rating.rate, 10);
                const fetched_count =  parseInt(response.data.rating.count, 10);
                console.log(fetched_rate , typeof(fetched_rate));
                console.log(fetched_count, typeof(fetched_count));

                setRate( fetched_rate) ; 
                setCount(fetched_count);
            })
            .catch((err) => { console.log("error sita ..", err) })
    }, [])

    const addCart = ()=>{
        localStorage.setItem("current",JSON.stringify(data));
        const user = localStorage.getItem("user");
        try {
            axios.put(`http://localhost:4500/musicProducts/${data._id}/cart/${user}`)
                .then((response) => { 
                    console.log(response)
                })                
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <Header />
            <div className='view-product'>
                <div className='heading'>
                    <div className="heading-section">
                        <img src={heading} alt="Music Art" className="heading-img" />
                        <p><b>Home | {data.name}</b></p>
                    </div>
                    <div>
                        <button>cart</button>
                    </div>
                </div>
                <div className='back-to-home'>
                    <button onClick={() => { navigate('/') }}>Back to Products</button>
                </div>
                <div className='product-description'>
                    <p>{data.description}</p>
                </div>
                <br></br>
                <div id="prodetails" className="section-p1">
                    <div className="single-pro-image">
                        <img src={data.main_image} alt=""width="100%" id="mainImg" />
                        <div className="small-img-group">
                            <div className="small-img-col">
                                <img src={data.left_view} alt="" width="100%" className="small-img" />
                            </div>
                            <div className="small-img-col">
                                <img src={data.top_view} alt="" width="100%" className="small-img" />
                            </div>
                            <div className="small-img-col">
                                <img src={data.right_view} alt="" width="100%" className="small-img" />
                            </div>
                        </div>
                    </div>
                    <div className="single-pro-details">
                        <h1>{data.name}</h1>
                        <div className='product-sub-details'>
                        {/* <p>
                            {[...Array(Math.ceil(parseInt(rate)))].map((_, i) => (
                          <span key={i}>⭐</span>
                             ))}
                             ({parseInt(count, 10)} customers)
                        </p> */}

                        <p>
                        { [...new Array(rate)].map( (e,i)=>(
                                <span key={i}>⭐</span>
                                
                            ) ) }({count} customers)
                        </p>
                           
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
                        <button className='buy-now' onClick={()=>{addCart();navigate('/viewCart')}} >Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            
          <Footer/>              
        </div>
    );
};

export default ProductDetail;