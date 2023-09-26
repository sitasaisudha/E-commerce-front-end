import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Health from "./components/Health/Health";
import NotFound from "./components/NotFound/NotFound";
import { Provider } from "./context/ProductContext";
import Home from "./components/Home/Home";
import ProductDetail from './components/viewProduct/ProductDetail';
import Congratulation from './components/Congratulations/Congratulation';
import ViewCart from './components/ViewCart/ViewCart';

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/viewProduct" element={<ProductDetail />} />
          <Route path="/viewCart" element={<ViewCart />} />
          <Route path="/congrats" element={<Congratulation />} />
        </Routes>
      </Router>
  </Provider>
  );
}

export default App;
