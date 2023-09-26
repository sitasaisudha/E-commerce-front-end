import React from 'react';
import './Congratulation.css';
import  heading  from '../../assets/images/heading.png';
import confetti from '../../assets/images/confetti.png';
import { useNavigate } from 'react-router-dom';
const Congratulation = () => {
    const navigate = useNavigate();
    return (
        <div className="success-page">
            <div><img className="imgg" src={heading} /></div>
            <center>
                <div className="card">
                    <img src={confetti} alt="Confetti" />
                    <p><b>Order is placed successfully!</b></p>
                    <p> You will be receiving a confirmation email with order details</p>
                    <button class="btn" onClick={()=>{navigate('/')}}><b>Go back to Home page</b></button>
                </div>
            </center>
        </div>
    );
};

export default Congratulation;