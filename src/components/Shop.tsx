import { useEffect, useState } from 'react';
import { useClicks } from '../utils/ClicksContext';
import { useItems } from '../utils/ItemsContext';

export default function Shop() {
  const { clicks, reduceClicks } = useClicks();
  const { items, unlockItem, buyItem } = useItems();

  const [hoveredItem, setHoveredItem] = useState<number | null>(null); // Estado para controlar qual item está sendo "hovered"

  useEffect(() => {
    items.forEach((item) => {
      if (clicks >= item.cost && !item.unlocked) {
        unlockItem(item.id);
      }
    });
  }, [clicks, items, unlockItem]);

  const handlePurchase = (itemId: number, cost: number) => {
    if (buyItem(itemId, cost) && reduceClicks(cost)) {
      console.log('comprado');
    } else {
      console.log('sem clicks');
    }
  };

return (

    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center gap-4 ">
        {items.map(
          (item) =>
            item.unlocked ? (
              <div 
                className='relative transition-all hover:-translate-y-[0.2rem] cursor-pointer'
                key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                >
                <img 
                  className='p-2 bg-white rounded-2xl border border-black h-20' 
                  key={item.id} 
                  src={item.img} 
                  width={80}
                  onClick={() => handlePurchase(item.id, item.cost)}
                  />
                {hoveredItem === item.id && (
                <div className="flex flex-col absolute w-48 -translate-x-14 text-center text-black p-2 desc-upgrade rounded-md mt-2 text-sm">
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
            ):(
              <div className='relative transition-all hover:-translate-y-[0.2rem] opacity-0'>
                <img 
                  className='p-1 rounded-2xl border border-black h-20' 
                  key={item.id} 
                  src={item.img} 
                  width={80}
                  onClick={() => handlePurchase(item.id, item.cost)}/>
              </div>
            )

        )}
      </div>
    </div>
  );
}
