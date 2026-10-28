import { useState } from "react";
import type { ReproCardProps } from "./ReproCardProps";

const ReproCard = ({ reproductor, controlVolum, stop }: ReproCardProps)=>{
    const [volum, setVolum] = useState(0);

    function handleVolum(pujabaixa: number) {
        const increment = controlVolum(pujabaixa);
        setVolum((volumActual) => Math.min(100, Math.max(0, volumActual + increment)));
    }

    return (
        <>
            <h1>Reproductor</h1>
            <p>Volum: {volum}</p>
            <button onClick={() => handleVolum(-1)}> elft </button>
            <button onClick={() => handleVolum(1)}> raight</button>
            <p>
                {reproductor.titol}
                {reproductor.reproduint && <button onClick={stop}>stop</button>}
            </p>
           
        </>
    )
}

export default ReproCard;