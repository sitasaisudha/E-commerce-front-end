import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './LoginStyles.css';
import img from '../../assets/images/heading.png'
const Login = () => {
    const nav = useNavigate();
    const showToastSuccessMessage = () => {
        toast.success("Logged in Successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
    
      }; // to show the Login  success toast message
      const showToastFailureMessage = () => {
        toast.error("Invalid Login !", {
          position: toast.POSITION.TOP_CENTER,
        }); // to show invalid login toast message
      };
    
  const [credentials, setCredentials] = useState({ input: '', password: '' });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  
      // let valid = true;
      // const handleSubmit = () => {
      //   console.log("clicked")
      //   if (!(formValues.mail.trim().length > 0)) {
      //     setMailError(true);
      //     valid = false;
      //   } else {
      //     setMailError(false);
      //   }
    
      //   if (!(formValues.pass_word.trim().length > 0)) {
      //     setPassError(true);
      //     valid = false;
      //   } else {
      //     setPassError(false);
      //   }
       
      //   console.log(valid)
      //   if (valid) {
      //       console.log("toast")
      //       showToastSuccessMessage();
      //   }
      //   else{
      //       showToastFailureMessage();
      //   }
      // };  

      const handleLogin = () => {
        const { input, password } = credentials;
    
        const loginData = { email: input, mobile: input, password };
    
      
        axios.post('http://localhost:4500/login', loginData)
          .then((response) => {
           localStorage.setItem("token", response.data.token);
           localStorage.setItem("user", input);
            console.log(response.data);
            showToastSuccessMessage();
            nav("/");
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
      };
    return (
      <div>
        <div className='login-container' >
         
            <img src={img} alt="banner image" />
            {/* <br />
            <br /> */}
            <div>
              <form  className='login-form'>
               <label className='heading'>Sign in</label>
                <div className='form-field'   > <label className='form-itm'>Email/ phone number</label>
                <input
                     type="email"
                    
                     className="form-itm"
                     name="input"
                      autoComplete="mail" 
                      value={credentials.input}
                      onChange={handleInputChange}
              
                    
                  ></input> </div>
                <div className='form-field' >
                <label className='form-itm'>Password</label>
                   <input
                        // onChange={(e) => handleChange(e)}
                        className="form-itm"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleInputChange}

                     ></input>

                </div>
                <div className='form-field'>  <input 
                   className='form-itm'
                   id='form-btn'
                   type="button"
                   value="continue"
                   onClick={handleLogin}
                   ></input> </div>
                  <p className='form-field' >By continuing you agree to Musiccarts privacy notice and conditions of use</p>
              </form>
              {/* <br />
              <br /> */}
              <div className='hr-lines' > <hr /> <span>New to Musicart ?</span> <hr /> </div>
              <br />
              <br />
              <div className='crete-btn'> Create your account </div>
            </div>

            <ToastContainer />
        </div>
        <div className='bottom-container'> <b>Musicart | All rights reserved</b> </div>
        </div>
    );
};

export default Login;