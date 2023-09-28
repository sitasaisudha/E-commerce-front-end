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
          <Route path="*" element={<NotFound />} />
          <Route path="/viewProduct" element={ isDesktopOrLaptop ?<ProductDetail/> : <MobileviewProduct/>} />
          <Route path="/viewCart" element={<ViewCart />} />
          <Route path="/congrats" element={<Congratulation />} />
         
        </Routes>
        
      </Router>
      </MyContext.Provider>
 
  );
}

export default App;
