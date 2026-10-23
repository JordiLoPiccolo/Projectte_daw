import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";


const SongCard = ({ trackInfo }: SongCardProps) => {
    
    let [totalReproduccions, setTotalReproduccions] = useState<number>(trackInfo.reproduccions);

    function handleClickPlay(inc:number) {
        const tr = (prev: number) => { return prev + 1 }
        setTotalReproduccions(tr);
    }
    return (
        <>
            <h1>Títol: {trackInfo.title}</h1>
            <p>Artista: {trackInfo.artist}</p>
            <p>Duració: {trackInfo.duration}</p>
            <p>Total Reproduccions: {totalReproduccions}</p>
            <p><button onClick={()=>handleClickPlay(3)}>Play</button></p>
        </>
    )
}

export default SongCard;