"use client";

import { useEffect, useState, createContext, useContext } from 'react';
import { fetchIsAuthoring } from '@craftercms/experience-builder';

const CrafterAppContext = createContext({ isAuthoring: false });

export const useCrafterAppContext = () => useContext(CrafterAppContext);

export const CrafterAppProvider = ({ children }: { children: React.ReactNode }) => {

  const [appContext, setAppContext] = useState({ isAuthoring: false });

  useEffect(() => {
    fetchIsAuthoring().then((isAuthoring) => setAppContext({ isAuthoring }));
  }, []);

  return (
    <CrafterAppContext.Provider value={appContext}>
      {children}
    </CrafterAppContext.Provider>
  )
}