import React, { createContext, useContext, useState, ReactNode } from 'react';

import DVD from '../assets/dvd-logo.svg'
import EMOJI from '../assets/emojianimado.png'
import FEED from '../assets/feedinfito.png'

interface Item {
  id: number;
  name: string;
  img: string;
  desc: string;
  cost: number;
  unlocked: boolean;
}

interface ItemsContextType {
  items: Item[];
  unlockItem: (itemId: number) => void;
  buyItem: (itemId: number, cost: number) => boolean;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Logo de DVD', img: DVD, desc: 'A cada colisão você ganha 1 estímulo', cost: 5, unlocked: false },
    { id: 2, name: 'Emoji animado', img: EMOJI, desc: 'aa', cost: 10, unlocked: false },
    { id: 3, name: 'Feed Infinito', img: FEED, desc: 'aaa', cost: 20, unlocked: false },
  ]);

  const unlockItem = (itemId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, unlocked: true } : item
      )
    );
  };

  const buyItem = (itemId: number, cost: number): boolean => {
    const item = items.find((item) => item.id === itemId);
    if (item && item.unlocked) {
      return true; // Compra bem-sucedida
    }
  
    // Desbloqueia e permite múltiplas compras para o DVD
    if (item && item.id === 1) {
      unlockItem(itemId); // Desbloqueia o item
      return true;
    }
  
    return false; // Não pode comprar se não estiver desbloqueado
  };
  

  return (
    <ItemsContext.Provider value={{ items, unlockItem, buyItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};