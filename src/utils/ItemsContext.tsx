import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useClicks } from './ClicksContext';
import { useMusicStore } from './MusicStore';

import DVD from '../assets/dvd-logo.svg';
import DOUBLE from '../assets/duploclique.png';
import BUTTON from '../assets/botao.png';
import FAVICON from '../assets/sitefoto.png'
import SUBWAY from '../assets/subway-surfers.webp'
import DVDUPGRADE from '../assets/dvdUpgrade.png'
import PRENSA from '../assets/prensa.jpeg'
import LOFI from '../assets/lofiicon.png'
import LAMP from '../assets/lampadaapagada.png'

interface Item {
  id: number;
  name: string;
  img: string;
  desc: string;
  cost: number;
  unlocked: boolean;
  quantity: number;
}

interface ItemsContextType {
  items: Item[];
  unlockItem: (itemId: number) => void;
  buyItem: (itemId: number, cost: number) => boolean;
  turnOffDarkMode: () => void;
  turnOnDarkMode: () => void;
  darkMode: boolean;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const changeFavicon = () => {
  const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

  if (link) {
    link.href = FAVICON;
  }
};

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Logo de DVD', img: DVD, desc: 'A cada colisão você ganha 1 estímulo', cost: 3, unlocked: false, quantity: 0 },
    { id: 2, name: 'Duplos Cliques', img: DOUBLE, desc: 'Seus cliques agora dão o dobro de estímulos!', cost: 10, unlocked: false, quantity: -2 },
    { id: 3, name: 'Botão melhorado', img: BUTTON, desc: 'Deixe seu botão mais bonito +1 estímulo por clique!', cost: 25, unlocked: false, quantity: -2 },
    { id: 4, name: 'Ícone do Site', img: FAVICON, desc: 'Adicione um Favicon no seu site!', cost: 40, unlocked: false, quantity: -2 },
    { id: 5, name: 'Subway Surfers', img: SUBWAY, desc: '+5 estímulos por segundo!', cost: 100, unlocked: false, quantity: -2 },
    { id: 6, name: 'Logo de DVD melhorado', img: DVDUPGRADE, desc: 'O logo agora muda de cor! +5 estímulos por colisão!', cost: 150, unlocked: false, quantity: -2 },
    { id: 7, name: 'Prensa Hidráulica', img: PRENSA, desc: '+10 estímulos por segundo!', cost: 200, unlocked: false, quantity: -2 },
    { id: 8, name: 'Modo Escuro', img: LAMP, desc: 'Adiciona a opção de modo escuro do site', cost: 300, unlocked: false, quantity: -2 },
    { id: 9, name: 'LOFI', img: LOFI, desc: 'Relaxe enquanto escuta seu lofi +15 estímulos por segundo!', cost: 400, unlocked: false, quantity: -2 },
  ]);

  const { clicks, setMultiplier, multiplier, startAutoClicks } = useClicks();

  const [isLofiActive, setIsLofiActive] = useState(false);

  const [totalAutoClicks, setTotalAutoClicks] = useState(0);

  const { isPlaying } = useMusicStore();

  const [darkMode, setDarkMode] = useState(false);


  const changeBackground = (active: boolean) => {
    const body = document.querySelector('body');
  
    if (body) {
      body.style.backgroundColor = active ? '#000' : '#fff';
    }
  }

  const turnOffDarkMode = () => {
    changeBackground(false);
    setDarkMode(false);
  };

  const turnOnDarkMode = () => {
    changeBackground(true);
    setDarkMode(true);
  };

  useEffect(() => {
    if (isLofiActive) {
      setTotalAutoClicks((prev) => prev + (isPlaying ? 15 : -15));
    }
  }, [isPlaying, isLofiActive]);

  useEffect(() => {
    startAutoClicks(totalAutoClicks);
  }, [totalAutoClicks, startAutoClicks]);
  
  
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

      // Lógica DVD
      if (item.id === 1) {
        if (clicks >= cost && item.unlocked) {
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId
                ? i.quantity > 4 ? { ...i, quantity: i.quantity + 1, cost: i.cost * 2 } : { ...i, quantity: i.quantity + 1, cost: i.cost + 5 }
                : i
            )
          );
          return true;
        }
      }

      // Lógica para "Duplos Cliques"
      if (item.id === 2 && item.quantity === -2) {
        if (clicks >= item.cost) {
          setMultiplier(multiplier + 1);
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
          setMultiplier(multiplier + 1);
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

      // Lógica Subway Surfers
      if (item.id === 5 && item.quantity === -2) {
        if (clicks >= item.cost) {
          setTotalAutoClicks((prev) => prev + 5);
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId ? { ...i, unlocked: false, quantity: -1 } : i
            )
          );
          return true;
        }
        return false;
      }

      // Lógica Button Upgrade
      if (item.id === 6 && item.quantity === -2) {
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

      // Lógica PRENSA
      if (item.id === 7 && item.quantity === -2) {
        if (clicks >= item.cost) {
          setTotalAutoClicks((prev) => prev + 10);
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId ? { ...i, unlocked: false, quantity: -1 } : i
            )
          );
          return true;
        }
        return false;
      }

      // Lógica BACKGROUND CHANGE
      if (item.id === 8 && item.quantity === -2) {
        if (clicks >= item.cost) {
          changeBackground(true);
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId ? { ...i, unlocked: false, quantity: -1 } : i
            )
          );
          return true;
        }
        return false;
      }

      // Lógica LOFI
      if (item.id === 9 && item.quantity === -2) {
        if (clicks >= item.cost) {
          setIsLofiActive(true);
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === itemId ? { ...i, unlocked: false, quantity: -1 } : i
            )
          );
          return true;
        }
        return false;
      }

      // Items sem lógica
      if (clicks >= item.cost && item.unlocked) {
        unlockItem(itemId);
        return true;
      }
    }

    return false;
  };

  return (
    <ItemsContext.Provider value={{ items, unlockItem, buyItem, turnOffDarkMode, turnOnDarkMode, darkMode }}>
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