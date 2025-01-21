import { useEffect, useState } from 'react';
import { useClicks } from '../utils/ClicksContext';
import { useItems } from '../utils/ItemsContext';

export default function Shop() {
  const { clicks, reduceClicks } = useClicks();
  const { items, unlockItem, buyItem } = useItems();

  const [hoveredItem, setHoveredItem] = useState<number | null>(null); // Estado para controlar qual item está sendo "hovered"

  useEffect(() => {
    items.forEach((item) => {
      if (clicks*2 >= item.cost && !item.unlocked) {
        unlockItem(item.id);
      }
    });
  }, [clicks, items, unlockItem]);

  const handlePurchase = (itemId: number, cost: number) => {
    const currentItemIndex = items.findIndex((item) => item.id === itemId);
    if (buyItem(itemId, cost) && reduceClicks(cost)) {
      // Desbloqueia o próximo item, se houver
      const nextItem = items[currentItemIndex + 1];
      if (nextItem) {
        unlockItem(nextItem.id);
      }
    }
  };

  const dvdLogo = items.find((item) => item.id === 1);
  const quantityDVD = dvdLogo?.quantity || 0;

  const maxItems = 4;

  return (

    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center gap-3 ">
        {items.filter((item) => item.unlocked && item.quantity !== -1).slice(0, maxItems).map((item) =>
          item.unlocked && item.quantity !== -1 ?
            (
              item.id === 1 && item.quantity > 0 ? // verificar se é o primeiro item (DVD)
                (
                  <div
                    className='relative transition-all hover:-translate-y-[0.2rem] cursor-pointer'
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="absolute -top-1 -right-2 text-white font-bold text-sm text-center w-7 p-1 bg-red-500 rounded-full">
                      {quantityDVD}
                    </div>
                    <img
                      className='p-2 bg-white rounded-2xl border border-black h-20'
                      src={item.img}
                      width={80}
                      onClick={() => handlePurchase(item.id, item.cost)}
                    />
                    {hoveredItem === item.id && (
                      <div className="upgradeTolltip flex flex-col bg-white absolute w-48 -translate-x-14 text-center text-black p-2 desc-upgrade rounded-md mt-2 text-sm">
                        <a className='text-base font-semibold'>{item.name}</a>
                        <a className='text-base text-[#6d6d6d]'>{item.desc}</a>
                        {clicks < item.cost ? (
                          <a className='text-base text-red-600'>Custo: {item.cost} estímulos</a>
                        ) : (
                          <a className='text-base'>Custo: {item.cost} estímulos</a>
                        )}
                      </div>
                    )}
                  </div>
                ) :
                <div
                  className='relative transition-all hover:-translate-y-[0.2rem] cursor-pointer'
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <img
                    className='p-2 bg-white rounded-2xl border border-black h-20'
                    src={item.img}
                    width={80}
                    onClick={() => handlePurchase(item.id, item.cost)}
                  />
                  {hoveredItem === item.id && (
                    <div className="upgradeTolltip flex flex-col bg-white absolute w-48 -translate-x-14 text-center text-black p-2 desc-upgrade rounded-md mt-2 text-sm">
                      <a className='text-base font-semibold'>{item.name}</a>
                      <a className='text-base text-[#6d6d6d]'>{item.desc}</a>
                      {clicks < item.cost ? (
                        <a className='text-base text-red-600'>Custo: {item.cost} estímulos</a>
                      ) : (
                        <a className='text-base'>Custo: {item.cost} estímulos</a>
                      )}
                    </div>
                  )}
                </div>
            ) : (
              null
            )
        )}
      </div>
    </div>
  );
}