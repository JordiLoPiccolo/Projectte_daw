import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import SongRow from "./SongRow";
import type { SongListProps } from "./Types/SongListProps";



const ListSongs = (props: SongListProps) => {
    return (
        <>
            {
                props.tracks.map(

                    (t: GETTrack) => {
                        return <SongRow
                            id={t.id}
                            title={t.title}
                            artist={t.artist}
                            duration={t.duration}
                            onPlay={() => {
                                props.setTrack({
                                    ...t,
                                    likes: { like: false, totalLikes: 0 },
                                    reproduccions: 0
                                });
                                props.onPlay(t);
                            }}
                        />

                    }

                )
            }
        </>
    )
}

export default ListSongs;