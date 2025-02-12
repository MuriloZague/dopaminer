import { useItems } from "../utils/ItemsContext";
 

export default function Footer() {

  const { darkMode } = useItems();

 return (
   <div className="text-center">
        <p className={`text-xs ${darkMode ? 'text-white' : 'text-black'}`}>by <a className="">Murilo Zague</a> :)</p>
   </div>
 );
}