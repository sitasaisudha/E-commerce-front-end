import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FaSearch } from "react-icons/fa";
import { GoHome } from "react-icons/fa";
import axios from 'axios';
import gridview_active from '../../../assets/images/gridview_active.png'
import gridview_inactive from '../../../assets/images/gridview_inactive.png'
import listview_active from '../../../assets/images/listview_active.png'
import listview_inactive from '../../../assets/images/listview_inactive.png'
import { useContext } from "react";
import { MyContext } from '../../../context/MyContext';
import {useNavigate} from 'react-router-dom'
const Footer = () => {
    const navigate = useNavigate();
    
    const { loggedIn} =useContext(MyContext);

    const [products, setProducts] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [gridview, setGridView] = useState(true)

    const [filters, setFilters] = useState({
        type: 'all',
        brand: 'all',
        color: 'all',
        minPrice : 0,
        maxPrice : Infinity,
        sortBy: 'price',
        sortOrder:'asc',
    });

    useEffect(() => {

        try {
            axios.get(`http://localhost:4500/musicProducts/getAllMusicProducts?type=${filters.type}&sortBy=${filters.sortBy}&sortOrder=${filters.sortOrder}&color=${filters.color}&brand=${filters.brand}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&price=${filters.price}`)
                .then((response) => {
                    let json = response.data
                    const results = json.filter((item)=>{
                        return item && item.name && item.name.includes(searchItem)
                    })
                    if(searchItem.length > 0){
                        setProducts(results)
                    }
                    else{
                        setProducts(response.data)
                    }                    
                })
                .catch((err) => { console.log(err) });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [filters,searchItem]);

    const handleSearchChange = (value) => {
        setSearchItem(value);
    }

    const handleFilterChange = (filterName, value) => {
        if(filterName === "price"){
            var priceRange = value;
            var priceArray = priceRange.split('-');
            var minPrice = parseInt(priceArray[0], 10); // Parse the first part as an integer
            var maxPrice = parseInt(priceArray[1], 10);
            setFilters({
                ...filters,
                ["minPrice"]: minPrice,
                ["maxPrice"]:maxPrice,
    
            });
        }
        else if(filterName == "sort"){
            if(value === "price-high-to-low" || value === "name-z-to-a"){
                setFilters({
                    ...filters,
                    ["sortOrder"]: "dsc",        
                });
            }
            else{
                setFilters({
                    ...filters,
                    ["sortOrder"]: "asc",     
                });
            }
        }
        else{
            setFilters({
                ...filters,
                [filterName]: value,
    
            });
        }
        
    };
    const handleCurrentProduct = (value)=>{
        localStorage.setItem("id",value);
        navigate('/viewProduct');
    }

    return (
        <div className='footer'>
            {/* search section */}
            <div className='search-input-wrapper'>
                <FaSearch id="search-icon" />
                <input
                    placeholder='Search Product'
                    value={searchItem}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
            </div>

            {/* filters applying section */}
            <div className='filter-section'>
                <div className='filter-without-sort'>
                    {gridview ?
                        <div className='views'>
                            <img src={gridview_active} alt="grid" onClick={() => { setGridView(true) }} />
                            <img src={listview_inactive} alt="list" onClick={() => setGridView(false)} />
                        </div> :
                        <div className='views'>
                            <img src={gridview_inactive} alt="grid" onClick={() => { setGridView(true) }} />
                            <img src={listview_active} alt="list" onClick={() => setGridView(false)} />
                        </div>
                        
                    }

                    <div className='filters-ontype'>
                        <div>
                            {/* <label>Product Type:</label> */}
                            <select
                                value={filters.productType}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                            >
                                  <option value="all">Products Type</option> 
                                <option value="all">Featured</option>
                                <option value="In-ear">In-Ear</option>
                                <option value="Over-ear">Over-Ear</option>
                                <option value="On-ear">On-Ear</option>
                            </select>
                        </div>
                        <div>
                            {/* <label>Company:</label> */}
                            <select
                                value={filters.company}
                                onChange={(e) => handleFilterChange('brand', e.target.value)}>
                                 <option value="all"> Company </option>
                                <option value="all">Featured</option>
                                <option value="Omiaro">Omiaro</option>
                                <option value="Boult">Boult</option>
                                <option value="boAt">boAt</option>
                                <option value="Noise">Noise</option>
                                <option value="Infinity">Infinity</option>
                                <option value="OnePlus">OnePlus</option>
                                <option value="ZEBRONICS">ZEBRONICS</option>
                                <option value="Apple">Apple</option>
                            </select>
                        </div>
                        <div>
                            {/* <label>Color:</label> */}
                            <select
                                value={filters.color}
                                onChange={(e) => handleFilterChange('color', e.target.value)}
                            >
                                 <option value="all"> Color </option>
                                <option value="all">Featured</option>
                                <option value="Blue">Blue</option>
                                <option value="Black">Black</option>
                                <option value="White">White</option>
                                <option value="Brown">Brown</option>
                            </select>
                        </div>
                        <div>
                            {/* <label>Price Range:</label> */}
                            <select
                                value={filters.priceRange}
                                onChange={(e) => handleFilterChange('price', e.target.value)}
                            >
                                 <option value="all"> Price range </option>
                                <option value="all">Featured</option>
                                <option value="0-1000">₹0-₹1000</option>
                                <option value="1000-10000">₹1000-₹10000</option>
                                <option value="10000-20000">₹10000-₹20000</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="sort" >
                    <label>Sort By:</label>
                    <select
                        value={filters.sort}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}>
                        <option value="none">None</option>
                        <option value="price-low-to-high">Price:Lowest</option>
                        <option value="price-high-to-low">Price:Highest</option>
                        <option value="name-a-to-z">Name:(A to Z)</option>
                        <option value="name-z-to-a">Name:(Z to A)</option>
                    </select>
                </div>
            </div>

            {/* filteres products */}

            {gridview && products ? <div className='all-products'>{products.map((item, index) => {
                return (
                    <div className='each-item' key={item._id}>
                        <div className='item-image'>
                            <img src={item.main_image} alt="mainImage" />
                            {loggedIn?<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 65 65" fill="none" onClick={()=>{ handleCurrentProduct(item._id)}}>
                                <g filter="url(#filter0_d_60_215)">
                                    <circle cx="32.5" cy="32.5" r="25.5" fill="white" />
                                </g>
                                <path d="M32.2344 29.5781H34.8906V25.5938H38.875V22.9375H34.8906V18.9531H32.2344V22.9375H28.25V25.5938H32.2344M26.9219 41.5312C25.4609 41.5312 24.2656 42.7266 24.2656 44.1875C24.2656 45.6484 25.4609 46.8438 26.9219 46.8438C28.3828 46.8438 29.5781 45.6484 29.5781 44.1875C29.5781 42.7266 28.3828 41.5312 26.9219 41.5312ZM40.2031 41.5312C38.7422 41.5312 37.5469 42.7266 37.5469 44.1875C37.5469 45.6484 38.7422 46.8438 40.2031 46.8438C41.6641 46.8438 42.8594 45.6484 42.8594 44.1875C42.8594 42.7266 41.6641 41.5312 40.2031 41.5312ZM27.1875 37.2812V37.1484L28.3828 34.8906H38.2109C39.1406 34.8906 40.0703 34.3594 40.4688 33.5625L45.6484 24.2656L43.3906 22.9375L38.2109 32.2344H28.9141L23.3359 20.2812H18.9531V22.9375H21.6094L26.3906 33.0313L24.5312 36.2188C24.3984 36.6172 24.2656 37.0156 24.2656 37.5469C24.2656 39.0078 25.4609 40.2031 26.9219 40.2031H42.8594V37.5469H27.4531C27.3203 37.5469 27.1875 37.4141 27.1875 37.2812Z" fill="#1D7000" />
                                <defs>
                                    <filter id="filter0_d_60_215" x="0" y="0" width="65" height="65" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity ="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="3.5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_215" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_215" result="shape" />
                                    </filter>
                                </defs>
                            </svg>:""}
                        </div>
                        <div className='item-data'>
                            <p><b>{item.name}</b></p>
                            <p><b>Price - ₹{item.price}</b></p>
                            <p>{item.color} | {item.type}</p>
                        </div>
                    </div>
                )
            })}</div> : ""}

            {!gridview && products ? <div className='all-products-nongridview'>{products.map((item, index) => {
                return (
                    <div className='each-item-nongrid' key={item._id}>
                        <div className='item-image-nongrid'>
                            <img src={item.main_image} alt="mainImage" />
                            {loggedIn?<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 65 65" fill="none" onClick={()=>{handleCurrentProduct(item._id)}}>
                                <g filter="url(#filter0_d_60_215)">
                                    <circle cx="32.5" cy="32.5" r="25.5" fill="white" />
                                </g>
                                <path d="M32.2344 29.5781H34.8906V25.5938H38.875V22.9375H34.8906V18.9531H32.2344V22.9375H28.25V25.5938H32.2344M26.9219 41.5312C25.4609 41.5312 24.2656 42.7266 24.2656 44.1875C24.2656 45.6484 25.4609 46.8438 26.9219 46.8438C28.3828 46.8438 29.5781 45.6484 29.5781 44.1875C29.5781 42.7266 28.3828 41.5312 26.9219 41.5312ZM40.2031 41.5312C38.7422 41.5312 37.5469 42.7266 37.5469 44.1875C37.5469 45.6484 38.7422 46.8438 40.2031 46.8438C41.6641 46.8438 42.8594 45.6484 42.8594 44.1875C42.8594 42.7266 41.6641 41.5312 40.2031 41.5312ZM27.1875 37.2812V37.1484L28.3828 34.8906H38.2109C39.1406 34.8906 40.0703 34.3594 40.4688 33.5625L45.6484 24.2656L43.3906 22.9375L38.2109 32.2344H28.9141L23.3359 20.2812H18.9531V22.9375H21.6094L26.3906 33.0313L24.5312 36.2188C24.3984 36.6172 24.2656 37.0156 24.2656 37.5469C24.2656 39.0078 25.4609 40.2031 26.9219 40.2031H42.8594V37.5469H27.4531C27.3203 37.5469 27.1875 37.4141 27.1875 37.2812Z" fill="#1D7000" />
                                <defs>
                                    <filter id="filter0_d_60_215" x="0" y="0" width="65" height="65" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity ="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="3.5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_215" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_215" result="shape" />
                                    </filter>
                                </defs>
                            </svg>:""}
                        </div>
                        <div className='item-data-nongrid'>
                            <h3><b>{item.name}</b></h3>
                            <p><b>Price - ₹{item.price}</b></p>
                            <p><b>{item.color} | {item.type}</b></p>
                            <p>{item.description}</p>
                            <button>Details</button>
                        </div>
                    </div>
                )
            })}</div> : ""}
        </div>
    );
};

export default Footer;