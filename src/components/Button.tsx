import { useClicks } from "../utils/ClicksContext";
import { useItems } from "../utils/ItemsContext";

export default function Button() {
  const { clicks, manualClick } = useClicks();
  const { items, darkMode } = useItems();

  const buttonUpgrade = items.find((item) => item.id === 3);
  const upgradeCheker = buttonUpgrade?.quantity === -1;

  return (
    <div className="flex flex-col items-center mb-10">
      <div
        className={`flex-button-container ${upgradeCheker ? "neo-button-container" : "h-16 flex items-center justify-center"}`}
        style={{ borderRadius: '15px' }}
        onClick={manualClick}
      >
        <div className={upgradeCheker ? "neo-button" : ""}>
          <button className={`bg-[#f0f0f0] border buttonTrans ${upgradeCheker ? "" : "hover:bg-[#d6d6d6]"} border-[#777] p-1 px-4`}>
            <a className="select-none inter-tight text-[1.35rem]">Clique</a>
          </button>
        </div>
      </div>

      <div className="text-center mt-5">
        {clicks === 0 ? (
          <p className="select-none inter-tight opacity-0 text-2xl">
            {clicks}
          </p>
        ) : (
          <p className={`
            transition-opacity duration-500 text-2xl 
            ${darkMode ? "inter-tight-white" : "inter-tight"}
          `}
        >
          {clicks} estímulos
        </p>
          )}
      </div>
    </div>
  );
}