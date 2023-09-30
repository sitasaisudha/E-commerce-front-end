import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Health from "./components/Health/Health";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import ProductDetail from './components/viewProduct/ProductDetail';
import Congratulation from './components/Congratulations/Congratulation';
import ViewCart from './components/ViewCart/ViewCart';
import { MyContext } from './context/MyContext';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileviewProduct from './components/viewProduct/MobileviewProduct';
import Login from './components/Login/Login';
import MobileLogin from './components/Login/MobileLogin';
import SignUp from './components/Login/SignUp';
import MobileSignUp from './components/Login/MobileSignUp';
import Cart from './components/ViewCart/Cart';
import Checkout from './components/Home/Checkout/Checkout';

function App() {
  const [loggedIn , setLoggedIn] = useState(true);
  const [currentPage, setCurrentpage] = useState("home");
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  return (
    <MyContext.Provider value={{loggedIn , setLoggedIn,currentPage, setCurrentpage}}  >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="/login" element={ isDesktopOrLaptop ?<Login/> :<MobileLogin/>} />
          <Route path="/register" element={ isDesktopOrLaptop ?<SignUp/> :<MobileSignUp/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/viewProduct" element={ isDesktopOrLaptop ?<ProductDetail/> : <MobileviewProduct/>} />
          <Route path="/viewCart" element={<ViewCart />} />
          <Route path="/Cart-items" element={<Cart/>}  />
          <Route path="/checkout" element={<Checkout/>}  />
          <Route path="/congrats" element={<Congratulation />} />
         
         
         
        </Routes>
        
      </Router>
      </MyContext.Provider>
 
  );
}

export default App;
