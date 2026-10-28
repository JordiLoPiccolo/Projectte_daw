import type { SongCardProps } from "./Types/SongCardProps";
import icon1 from "../../assets/blackThumbs.png";
import icon2 from "../../assets/greenThumbs.png";


const SongCard = ({ trackInfo,play,like,reset }: SongCardProps) => {


    function handleClickPlay(inc: number) {
        play(inc);
    }

    function handleReset() {
        reset();
    }
    
    function handleLike() {
        like();
    }

    
    return (
        <>
            
            <h1>Títol: {trackInfo.title}</h1>
            <p>Artista: {trackInfo.artist}</p>
            <p>Duració: {trackInfo.duration}</p>
            <p>Total Reproduccions: {trackInfo.reproduccions}</p>
            <p><button onClick={() => handleClickPlay(1)}>Play</button></p>
            <p><img onClick={() => handleLike()} src = {trackInfo.likes.like?icon2:icon1}></img>{trackInfo.likes.totalLikes}</p>
            <p><button onClick={() => handleReset()}>Reset</button></p>
        </>
    )
}

export default SongCard;