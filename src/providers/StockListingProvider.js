import React, {createContext} from 'react';
import {useFetchStockList} from '../hooks/useFetchStockList';
const StockListingContext = createContext();

export const StockListingProvider = ({children}) => {
  const stockListing = useFetchStockList();
  return (
    <StockListingContext.Provider value={stockListing}>
      {children}
    </StockListingContext.Provider>
  );
};

export const useStockListingContext = () => {
  return React.useContext(StockListingContext);
};
