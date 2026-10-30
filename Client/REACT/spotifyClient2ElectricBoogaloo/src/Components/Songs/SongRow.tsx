import type { SongRowProps } from "./Types/SongRowProps";



const SongRow = (props: SongRowProps) => {

    return (
        <>
            <h1>Títol: {props.title}</h1>
            <p>Artista: {props.artist}</p>
            <p>Duració: {props.duration}</p>
        </>
    )
}

export default SongRow;