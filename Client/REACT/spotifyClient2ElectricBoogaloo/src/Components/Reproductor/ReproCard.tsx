import { useState } from "react";
import type { ReproCardProps } from "./ReproCardProps";

const ReproCard = ({ trackInfo,controlVolum }: ReproCardProps)=>{
    const [volum, setVolum] = useState(0);

    function handleVolum(pujabaixa: boolean) {
        const increment = controlVolum(pujabaixa);
        setVolum((volumActual) => Math.min(100, Math.max(0, volumActual + increment)));
    }

    return (
        <>
            <h1>Reproductor</h1>
            <p>Volum: {volum}</p>
            <button onClick={() => handleVolum(false)}> elft </button>
            <button onClick={() => handleVolum(true)}> raight</button>
            <p>{trackInfo.title}</p>
           
        </>
    )
}

export default ReproCard;