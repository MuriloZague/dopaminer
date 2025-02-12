import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ClickContextType {
  clicks: number;
  multiplier: number;
  addClick: () => void;
  manualClick: () => void;
  reduceClicks: (cost: number) => boolean;
  setMultiplier: (value: number) => void;
  startAutoClicks: (rate: number) => void
}

const ClicksContext = createContext<ClickContextType | undefined>(undefined);

export const ClicksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clicks, setClicks] = useState<number>(0);
  const [multiplier, setMultiplierState] = useState<number>(1);
  const [autoClicking, setAutoClicking] = useState<boolean>(false);
  const [clickRate, setClickRate] = useState<number>(0);

  const setMultiplier = (value: number) => {
    setMultiplierState(value);
  };

  const addClick = () => {
    setClicks((prev) => prev + 1);
  };

  const manualClick = () => {
    setClicks((prev) => prev + multiplier);
  }

  const reduceClicks = (cost: number): boolean => {
    if (clicks >= cost) {
      setClicks((prev) => prev - cost);
      return true;
    }
    return false;
  };

  const startAutoClicks = (rate: number) => {
    setClickRate(rate);
    if (!autoClicking) {
      setAutoClicking(true);
    }
  };

  useEffect(() => {
    if (autoClicking) {
      const interval = setInterval(() => {
        setClicks((prev) => prev + clickRate);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [autoClicking, clickRate]);

  return (
    <ClicksContext.Provider
      value={{ clicks, multiplier, addClick, manualClick, reduceClicks, setMultiplier, startAutoClicks, }}
    >
      {children}
    </ClicksContext.Provider>
  );
};

export const useClicks = () => {
  const context = useContext(ClicksContext);
  if (!context) {
    throw new Error('useClicks must be used within a ClicksProvider');
  }
  return context;
};