import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useClicks } from './ClicksContext';

import DVD from '../assets/dvd-logo.svg';
import DOUBLE from '../assets/duploclique.png';
import BUTTON from '../assets/botao.png';
import FAVICON from '../assets/sitefoto.png'
import SUBWAY from '../assets/subway-surfers.webp'

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

const changeFavicon = () => {
  const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

  if (link) {
    link.href = FAVICON;  // Caminho do novo favicon
  }
};

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Logo de DVD', img: DVD, desc: 'A cada colisão você ganha 1 estímulo', cost: 5, unlocked: false, quantity: 0 },
    { id: 2, name: 'Duplos Cliques', img: DOUBLE, desc: 'Seus cliques agora dão o dobro de estímulos!', cost: 10, unlocked: false, quantity: -2 },
    { id: 3, name: 'Botão melhorado', img: BUTTON, desc: 'Deixe seu botão mais bonito ( ͡° ͜ʖ ͡°)', cost: 20, unlocked: false, quantity: -2 },
    { id: 4, name: 'Ícone do Site', img: FAVICON, desc: 'Adicione um Favicon no seu site!', cost: 30, unlocked: false, quantity: -2},
    { id: 5, name: 'Subway Surfers', img: SUBWAY, desc: '+5 estímulos por segundo!', cost: 60, unlocked: false, quantity: -2},
  ]);

  const { clicks, setMultiplier, startAutoClicks } = useClicks();

  const unlockItem = (itemId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, unlocked: true } : item
      )
    );
  };

  const buyItem = (itemId: number, _cost: number): boolean => {
    const item = items.find((item) => item.id === itemId);

    if (item) {

      // Lógica para "Duplos Cliques"
      if (item.id === 2 && item.quantity === -2) {
        if (clicks >= item.cost) {
          setMultiplier(2);
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId ? { ...i, unlocked: false, quantity: -1 } : i
            )
          );
          return true;
        }
        return false;
      }

      // Lógica para "Botão Melhorado"
      if (item.id === 3 && item.quantity === -2) {
        if (clicks >= item.cost) {
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId ? { ...i, unlocked: false, quantity: -1 } : i
            )
          );
          return true;
        }
        return false;
      }

      // Lógica Subway Surfers
      if (item.id === 5 && item.quantity === -2) {
        if (clicks >= item.cost) {
          startAutoClicks(5)
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId ? { ...i, unlocked: false, quantity: -1 } : i
            )
          );
          return true;
        }
        return false;
      }

      // Lógica Favicon
      if (item.id === 4 && item.quantity === -2) {
        if (clicks >= item.cost) {
          changeFavicon();
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId ? { ...i, unlocked: false, quantity: -1 } : i
            )
          );
          return true;
        }
        return false;
      }

      // Items que aumentam preço
      if (item.id === 1) {
        if (clicks >= cost && item.unlocked) {
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId
                ? { ...i, quantity: i.quantity + 1, cost: i.cost * 2 }
                : i
            )
          );

          return true;
        }
      }

      // Items sem lógica
      if (clicks >= item.cost && item.unlocked) {
        unlockItem(itemId);
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
