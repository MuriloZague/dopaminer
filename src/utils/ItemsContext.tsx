import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useClicks } from './ClicksContext';

import DVD from '../assets/dvd-logo.svg';
import EMOJI from '../assets/emojianimado.png';
import FEED from '../assets/feedinfito.png';

interface Item {
  id: number;
  name: string;
  img: string;
  desc: string;
  cost: number;
  unlocked: boolean;
  quantity: number; // Cada item tem uma quantidade
}

interface ItemsContextType {
  items: Item[];
  unlockItem: (itemId: number) => void;
  buyItem: (itemId: number, cost: number) => boolean;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Logo de DVD', img: DVD, desc: 'A cada colisão você ganha 1 estímulo', cost: 5, unlocked: false, quantity: 0 },
    { id: 2, name: 'Duplos Cliques', img: EMOJI, desc: 'Seus cliques agora dão o dobro de estímulos!', cost: 10, unlocked: false, quantity: -2 },
    { id: 3, name: 'Feed Infinito', img: FEED, desc: 'aaa', cost: 20, unlocked: false, quantity: 0 },
  ]);

  const { clicks, setMultiplier } = useClicks();

  const unlockItem = (itemId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, unlocked: true } : item
      )
    );
  };

  const buyItem = (itemId: number, cost: number): boolean => {
    const item = items.find((item) => item.id === itemId);

    if (item) {
      // Lógica para "Duplos Cliques"
      if (item.id === 2 && item.quantity === -2) {
        if (clicks >= item.cost) {
          // Configura o multiplicador de cliques
          setMultiplier(2);

          // Atualiza o estado do item
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId ? { ...i, unlocked: false, quantity: -1 } : i
            )
          );

          return true;
        }

        return false; // Não há cliques suficientes
      }

      // Lógica para outros itens
      if (clicks >= cost && item.unlocked) {
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === itemId
              ? { ...i, quantity: i.quantity + 1, cost: i.cost * 3 }
              : i
          )
        );

        return true;
      }
    }

    return false; // Não conseguiu comprar o item
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
    console.error('useItems must be used within an ItemsProvider');
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};
