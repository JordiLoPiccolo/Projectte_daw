import type { SongRowProps } from "./Types/SongRowProps";
import { formatDuracio } from "../../Config/formatDuration";
import type { Track } from "../../Model/Track";



const SongRow = (props: SongRowProps) => {

    function editar() {

        const song: Track = {
            id: props.id,
            title: props.title,
            artist: props.artist,
            artist_id: props.artist_id,
            duration: props.duration
        }

        props.edit(song);
    }

    return (
        <>
            <tr>
                <td><b>Títol</b>: {props.title}</td>
                <td><b>Artista</b>: {props.artist}</td>
                <td><b>Durada</b>: {formatDuracio(props.duration)}</td>
                <td><button type="button" onClick={props.onPlay}>Play</button></td>
                <td><button type="button" onClick={editar}>Edit</button></td>
            </tr>
        </>
    )
}

export default SongRow;