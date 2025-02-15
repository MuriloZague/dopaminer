import { useState, useEffect } from "react";
import { useItems } from "./utils/ItemsContext";
import { useClicks } from "./utils/ClicksContext";
import Button from "./components/Button";
import DVDLogo from "./components/DVDLogo";
import Shop from "./components/Shop";
import Video from "./components/Videos";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import Lamp from "./components/Lamp";

function App() {

  const { items, turnOffDarkMode, turnOnDarkMode } = useItems();
  const { addClick } = useClicks();
  const [active, setActive] = useState(true);

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

  useEffect(() => {
    if (active) {
      turnOffDarkMode();
    } else {
      turnOnDarkMode();
    }
  }, [active, turnOffDarkMode, turnOnDarkMode]);

  const activateLamp = () => {
    setActive(!active);
    console.log("Lamp toggled. Dark mode updated.");
  };

  const dvdLogo = items.find((item) => item.id === 1);
  const quantityDVD = dvdLogo?.quantity || 0

  const subWay = items.find((item) => item.id === 5);
  const subChecker = subWay?.quantity === -1

  const hidricPress = items.find((item) => item.id === 7);
  const pressChecker = hidricPress?.quantity === -1

  const dvdUpgrade = items.find((item) => item.id === 6);
  const dvdUpgradeChecker = dvdUpgrade?.quantity === -1;

  const lofi = items.find((item) => item.id === 9);
  const lofiChecker = lofi?.quantity === -1

  const lamp = items.find((item) => item.id === 8);
  const lampChecker = lamp?.quantity === -1

  return (
    <section className="relative h-screen w-screen">
      <svg
        width={windowSize.width}
        height={windowSize.height}
        className="absolute inset-0 -z-10 w-full h-full"
      >
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

      {lampChecker && (
        <div className="fixed z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Lamp lampOn={active} setLampOn={activateLamp} />
        </div>
      )}

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
        <Video
          src="https://streamable.com/e/twagjf?autoplay=1&muted=1"
          height="350"
          width="200"
          bottom="0px"
          right="1rem"
          left=""
        />
      ) : null}

      {pressChecker ? (
        <Video
          src="https://streamable.com/e/6amkk0?autoplay=1&muted=1&nocontrols=1"
          height="235"
          width="420"
          bottom="0px"
          right=""
          left="1rem"
        />
      ) : null}

      {lofiChecker ? (
        <div className="fixed bottom-11 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="pointer-events-auto text-center">
            <MusicPlayer />
          </div>
        </div>
      ) : (
        null
      )}

      <Footer />
    </section>
  );

}

export default App;