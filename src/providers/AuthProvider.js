import React, {createContext} from 'react';
import {useFetchStockList} from '../hooks/useFetchStockList';
const AuthContext = createContext();

export const StockListingProvider = ({children}) => {
  const stockListing = useFetchStockList();
  return (
    <AuthContext.Provider value={stockListing}>{children}</AuthContext.Provider>
  );
};

export const useStockListingContext = () => {
  return React.useContext(AuthContext);
};
