import { useClicks } from "../utils/ClicksContext";
import { useItems } from "../utils/ItemsContext";

export default function Button() {

    const { clicks, manualClick } = useClicks();
    const { items } = useItems();

    const buttonUpgrade = items.find((item) => item.id === 3);
    const upgradeCheker = buttonUpgrade?.quantity === -1

    return (

        <div className="flex flex-col items-center mb-10">
                <div className={upgradeCheker ? "flex-button-container" : ""}>
                    <div className={upgradeCheker ? "neo-button" : ""} onClick={manualClick}>
                        <button className="bg-[#f0f0f0] border buttonTrans hover:bg-[#ddd] border-[#777] p-1 px-4">
                            <a className="select-none inter-tight text-[1.35rem]">Clique</a>
                        </button>
                    </div>
                </div>
            <div className="text-center mt-5">
                {clicks === 0 ?
                    <p className="select-none inter-tight opacity-0 text-2xl">
                        {clicks}
                    </p>
                    :
                    <p className="inter-tight transition-opacity duration-500 text-2xl">
                        {clicks} estímulos
                    </p>
                }
            </div>
        </div>
    );
}