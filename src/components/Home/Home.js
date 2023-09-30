import React, { useEffect } from "react";
import "./Home.css";
import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import { useMediaQuery } from 'react-responsive';
import MobileHEader from "./Header/MobileHEader";
import MobileBanner from "./Banner/MobileBanner";
import MobileFooter from "./Body/MobileBody";
import { MyContext } from "../../context/MyContext";
import { useContext } from "react";
import Body from "./Body/Body";
import MobileBody from "./Body/MobileBody";
import Footer from "./Footer/Footer";

const Home = () => {
  
  const { loggedIn, setLoggedIn } =useContext(MyContext);
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'});
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="mainHome">
      {/* <Header /> */}
      {isDesktopOrLaptop ?<Header />: <MobileHEader/> }
      {isDesktopOrLaptop ?<Banner />: <MobileBanner/> }
      {isDesktopOrLaptop ?<Body />: <MobileBody/> }
      {isDesktopOrLaptop ?<Footer />: "" }


      
      {/* <Banner /> */}
      {/* <Footer /> */}
      
      
    </div>
  );
};

export default Home;