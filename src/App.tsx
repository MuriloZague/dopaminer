import { useState, useEffect } from "react";
import { useItems } from "./utils/ItemsContext";
import { useClicks } from "./utils/ClicksContext";
import Button from "./components/Button";
import DVDLogo from "./components/DVDLogo";
import Shop from "./components/Shop";
import Subway from "./components/SubwaySurfers";
import Footer from "./components/Footer";

function App() {

  const { items } = useItems();
  const { addClick } = useClicks();

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

  const dvdUpgrade = items.find((item) => item.id === 6);
  const dvdUpgradeChecker = dvdUpgrade?.quantity === -1;

  return (

    <section className="relative h-screen w-screen">
      <svg width={windowSize.width} height={windowSize.height} className="absolute inset-0 -z-10 w-full h-full">
        {Array.from({ length: quantityDVD }).map((_, index) => (
          <DVDLogo
            key={index}
            addClick={addClick}
            dvdUpgradeChecker={dvdUpgradeChecker}
            width={windowSize.width}
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
      {subChecker ? (
        <Subway />
      ):(
        null
      )}
      <Footer />
    </section>
  );
}

export default App;