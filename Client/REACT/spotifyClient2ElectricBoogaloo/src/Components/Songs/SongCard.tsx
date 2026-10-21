import { tracks } from "../../Data/track/track";
import type { Track } from "../../Interfaces/Track";

const totalTracks: number = tracks.length;
const random: number = Math.floor(Math.random() * totalTracks);
const track: Track = tracks[random]; 

const SongCard = () => {
    return (
        <>
            <h1>Rattle and hum</h1>
            <p>U2</p>
            <p>1998</p>
        </>
    )
}

export default SongCard;