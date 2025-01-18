import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClickContextType {
  clicks: number;
  addClick: () => void;
  reduceClicks: (cost: number) => boolean; // Função para reduzir os cliques ao comprar
}

const ClicksContext = createContext<ClickContextType | undefined>(undefined);

export const ClicksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clicks, setClicks] = useState<number>(0);

  const addClick = () => {
    setClicks((prev) => prev + 1); // Normalmente, aumenta um clique
  };

  const reduceClicks = (cost: number): boolean => {
    if (clicks >= cost) {
      setClicks((prev) => prev - cost);
      return true;
    }
    return false; // Retorna false se o usuário não tiver cliques suficientes
  };

  return (
    <ClicksContext.Provider value={{ clicks, addClick, reduceClicks }}>
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