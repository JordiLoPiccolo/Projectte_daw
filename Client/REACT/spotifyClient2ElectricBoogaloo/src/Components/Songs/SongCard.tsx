import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";
import icon1 from "../../assets/blackThumbs.png";
import icon2 from "../../assets/greenThumbs.png";
import { tracks } from '../../Data/track/track';
import type { Track } from '../../Model/Track';

const SongCard = ({ trackInfo }: SongCardProps) => {

    let [totalReproduccions, setTotalReproduccions] = useState<number>(trackInfo.reproduccions);
    let [titol, setTitol] = useState<string>(trackInfo.title);
    let [artista, setArtista] = useState<string>(trackInfo.artist);
    let [duracio, setDuracio] = useState<number>(trackInfo.duration);
    let likes: number = 0;
    const [viewCon, setLikes] = useState<boolean>(false);
    let [totalLikes, setTotalLikes] = useState<number>(likes);

    function handleClickPlay(inc: number) {
        const tr = (prev: number) => { return prev + inc }
        setTotalReproduccions(tr);
    }

    function handleReset() {
        setLikes(!viewCon);
        setTotalLikes(0);
        setTotalReproduccions(0);
    }
    
    function handleLike() {
        setTotalLikes((SettotalLikes) => SettotalLikes + (viewCon ? -1 : 1))
        setLikes((previousViewCon) => !previousViewCon);
    }

    function handleRandom() {
        const totalTracks: number = tracks.length;
        const random: number = Math.floor(Math.random() * totalTracks);
        const track: Track = tracks[random];

        setTitol(track.title);
        setArtista(track.artist);
        setDuracio(track.duration);
    }
    return (
        <>
            <p><button onClick={() => handleRandom()}>Random</button></p>
            <h1>Títol: {titol}</h1>
            <p>Artista: {artista}</p>
            <p>Duració: {duracio}</p>
            <p>Total Reproduccions: {totalReproduccions}</p>
            <p><button onClick={() => handleClickPlay(1)}>Play</button></p>
            <p><button onClick={() => handleClickPlay(5)}>Play 5 times</button></p>
            <p><button onClick={() => handleClickPlay(10)}>Play 10 times</button></p>
            <p><img src={viewCon ? icon2 : icon1} onClick={() => handleLike()}></img>{totalLikes}</p>
            <p><button onClick={() => handleReset()}>Reset</button></p>
        </>
    )
}

export default SongCard;