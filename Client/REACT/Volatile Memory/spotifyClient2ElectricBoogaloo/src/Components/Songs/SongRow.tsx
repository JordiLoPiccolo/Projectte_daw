import type { SongRowProps } from "./Types/SongRowProps";



const SongRow = (props: SongRowProps) => {

    return (
        <>
            <tr>
            <td><b>Títol</b>: {props.title}</td>
            <td><b>Artista</b>: {props.artist}</td>
            <td><b>Durada</b>: {props.duration}</td>
            </tr>
            </>
    )
}

export default SongRow;