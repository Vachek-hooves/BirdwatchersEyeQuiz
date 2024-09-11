import {useState, useEffect, useContext, createContext} from 'react';

export const BirdContext = createContext({});

export const BirdProvider = ({children}) => {
    
  const value = {};
  return <BirdContext.Provider value={value}></BirdContext.Provider>;
};
