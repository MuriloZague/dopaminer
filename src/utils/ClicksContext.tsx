import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClickContextType {
  clicks: number;
  multiplier: number; // Novo estado para o multiplicador
  addClick: () => void;
  reduceClicks: (cost: number) => boolean;
  setMultiplier: (value: number) => void; // Para configurar o multiplicador
}

const ClicksContext = createContext<ClickContextType | undefined>(undefined);

export const ClicksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clicks, setClicks] = useState<number>(0);
  const [multiplier, setMultiplierState] = useState<number>(1); // Valor inicial do multiplicador é 1

  const addClick = () => {
    setClicks((prev) => prev + multiplier); // Adiciona cliques multiplicados
  };

  const reduceClicks = (cost: number): boolean => {
    if (clicks >= cost) {
      setClicks((prev) => prev - cost); // Reduz o custo corretamente
      return true;
    }
    return false; // Retorna falso se o usuário não tiver cliques suficientes
  };

  const setMultiplier = (value: number) => {
    setMultiplierState(value); // Atualiza o multiplicador
  };

  return (
    <ClicksContext.Provider
      value={{ clicks, multiplier, addClick, reduceClicks, setMultiplier }}
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
