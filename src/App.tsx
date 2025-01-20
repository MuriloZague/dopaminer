import { useState, useEffect } from "react";
import { useClicks } from "./utils/ClicksContext";
import { useItems } from "./utils/ItemsContext";
import Button from "./components/Button";
import DVDLogo from "./components/DVDLogo";
import Shop from "./components/Shop";
import Subway from "./components/SubwaySurfers";
import Footer from "./components/Footer";

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

  const subWay = items.find((item) => item.id === 5);
  const subChecker = subWay?.quantity === -1

  return (

    <section className="relative h-screen w-screen">
      <svg width={windowSize.width} height={windowSize.height} className="absolute inset-0 -z-10 w-full h-full">
        {Array.from({ length: quantityDVD }).map((_, index) => (
          <DVDLogo
            key={index}
            width={windowSize.width}
            addClick={addClick}
            height={windowSize.height}
          />
        ))}
      </svg>

      <div className="relative z-10 flex justify-center items-center h-[97%]">
        <div className="transform -translate-y-10">
          <div className="">
            <Button />
          </div>
          <div className="h-20">
            <Shop />
          </div>
        </div>
      </div>
      <div className={subChecker ? '' : 'hidden'}>
        <Subway />
      </div>
      <Footer />
    </section>
  );
}

export default App;