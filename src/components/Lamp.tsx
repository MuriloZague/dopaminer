import LAMPON from '../assets/lampadaacesa.png'
import LAMPOFF from '../assets/lampadaapagada.png'

interface LampProps {
  lampOn: boolean;
  setLampOn: () => void;
}

export default function Lamp({ lampOn, setLampOn }: LampProps) {
  return (
    <div className="cursor-pointer" onClick={setLampOn}>
      <img src={lampOn ? LAMPON : LAMPOFF} alt="Lamp" className="w-16 h-16" />
    </div>
  );
}