import React from 'react';
import './Congratulation.css';
import  heading  from '../../assets/images/heading.png';
import confetti from '../../assets/images/confetti.png';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/images/Group 30.png';
import { useMediaQuery } from 'react-responsive';
import MobHead2 from '../Home/Header/MobHead2';
const Congratulation = () => {
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const navigate = useNavigate();

    return (
        <div className="success-page">
              {isDesktopOrLaptop ?  <div><img className="imgg" src={heading} /></div>: <MobHead2/> }
          
           
            <center>
                <div className="card">
                    <img src={confetti} alt="Confetti" />
                    <p><b>Order is placed successfully!</b></p>
                    <p> You will be receiving a confirmation email with order details</p>
                    <br></br>
                    <button className="btn" onClick={()=>{navigate('/')}}><b>Go back to Home page</b></button>
                </div>
            </center>
        </div>
    );
};

export default Congratulation;