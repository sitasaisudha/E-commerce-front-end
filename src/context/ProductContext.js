const { createContext, useState, useEffect } = require("react");

const ProductContext = createContext();

const Provider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(true);
  const [current,setCurrent] = useState("")
  const valueToShare = {
    loggedIn,setLoggedIn,
    current,setCurrent,
  };
  
  return (
    <ProductContext.Provider value={valueToShare}>
      {children}
    </ProductContext.Provider>
  );
  
};

export { Provider };

export default ProductContext;
