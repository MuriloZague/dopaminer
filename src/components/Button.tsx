import { useClicks } from "../utils/ClicksContext";

export default function Button() {

    const { clicks, addClick } = useClicks();

 return (

   <div className="flex flex-col items-center">

        <div>
            <button className="bg-[#f0f0f0] border hover:bg-[#ddd] border-[#777] p-1 px-4" onClick={addClick}>
                <a className="inter-tight text-[1.35rem]">Clique</a>
            </button>
        </div>

        <div className="text-center mt-5">
            {clicks === 0 ?
                <p className="inter-tight opacity-0 text-2xl">
                    {clicks}
                </p>
            :
                <p className="inter-tight transition-opacity duration-500 text-2xl">
                    {clicks} estímulos
                </p>
            }
            
        </div>
        <div>
            <button></button>
        </div>
   </div>

 );
}