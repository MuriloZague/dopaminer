import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useClicks } from './ClicksContext';

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
  quantity: number; // Agora cada item tem uma quantidade
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
    { id: 2, name: 'Duplo Clique', img: EMOJI, desc: 'Seus cliques agora dão o dobro de estímulos!', cost: 10, unlocked: false, quantity: 0 },
    { id: 3, name: 'Feed Infinito', img: FEED, desc: 'aaa', cost: 20, unlocked: false, quantity: 0 },
  ]);

  const { clicks } = useClicks();

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
      // Impede a compra de itens que foram bloqueados permanentemente
      if (item.id === 2 && item.quantity >= 1) {
        return false; // O "Emoji animado" já foi comprado e não pode ser comprado novamente
      }
  
      // Para o item "Logo de DVD", o preço aumenta e ele pode ser comprado várias vezes
      if (item.id === 1 && clicks >= cost) {
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === itemId
              ? { ...i, quantity: i.quantity + 1, cost: i.cost + 5 } // Aumenta a quantidade e o preço
              : i
          )
        );
        return true; // Compra bem-sucedida
      }
  
      // Para o item "Emoji animado", permite a compra apenas uma vez
      if (item.id === 2 && clicks >= item.cost && !item.unlocked) {
        unlockItem(itemId); // Desbloqueia o item pela primeira vez
        // Marca a quantidade como 1 e bloqueia o item para compras futuras
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === itemId
              ? { ...i, unlocked: false, quantity: 1 } // Marca como comprado e com quantidade 1
              : i
          )
        );
        return true; // Compra bem-sucedida
      }
  
      // Para todos os outros itens, se o item está desbloqueado e o usuário tem cliques suficientes, compra
      if (clicks >= item.cost && item.unlocked) {
        unlockItem(itemId); // Desbloqueia o item
        return true; // Compra bem-sucedida
      }
    }
  
    return false; // Não pode comprar se não estiver desbloqueado ou sem cliques suficientes
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