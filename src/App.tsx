import { useState, useEffect } from "react";
import { useClicks } from "./utils/ClicksContext";
import { useItems } from "./utils/ItemsContext";
import Button from "./components/Button";
import DVDLogo from "./components/DVDLogo";
import Shop from "./components/Shop";

function App() {

  const { addClick } = useClicks();
  const { items } = useItems();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dvdLogo = items.find((item) => item.id === 1);
  const quantityDVD = dvdLogo?.quantity || 0

  return (
    <section className="relative h-screen w-screen">
      
      <svg width={windowSize.width} height={windowSize.height} className="absolute inset-0 -z-10 w-full h-full">
      {Array.from({ length: quantityDVD }).map((_, index) => (
          <DVDLogo
            key={index} // Adicionei a key para cada elemento gerado
            width={windowSize.width}
            addClick={addClick}
            height={windowSize.height}
          />
        ))}
      </svg>

      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="transform -translate-y-10">
          <Button />
          <div className="mt-5">
            <Shop />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;