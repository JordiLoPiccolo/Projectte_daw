import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";
import icon1 from "../../assets/blackThumbs.png";
import icon2 from "../../assets/greenThumbs.png";

const SongCard = ({ trackInfo }: SongCardProps) => {

    let [totalReproduccions, setTotalReproduccions] = useState<number>(trackInfo.reproduccions);
    let likes: number = 0;
    const [viewCon, setLikes] = useState<boolean>(false);
    let [totalLikes, setTotalLikes] = useState<number>(likes);
    function handleClickPlay(inc: number) {
        const tr = (prev: number) => { return prev + inc }
        setTotalReproduccions(tr);
    }
    
    function handleLike() {
        setTotalLikes((SettotalLikes) => SettotalLikes + (viewCon ? -1 : 1))
        setLikes((previousViewCon) => !previousViewCon);
    }
    return (
        <>
            <h1>Títol: {trackInfo.title}</h1>
            <p>Artista: {trackInfo.artist}</p>
            <p>Duració: {trackInfo.duration}</p>
            <p>Total Reproduccions: {totalReproduccions}</p>
            <p><button onClick={() => handleClickPlay(1)}>Play</button></p>
            <p><button onClick={() => handleClickPlay(5)}>Play 5 times</button></p>
            <p><button onClick={() => handleClickPlay(10)}>Play 10 times</button></p>
            <p><img src={viewCon ? icon2 : icon1} onClick={() => handleLike()}></img>{totalLikes}</p>
        </>
    )
}

export default SongCard;