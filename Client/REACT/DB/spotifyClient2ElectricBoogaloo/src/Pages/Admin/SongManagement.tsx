import { useEffect, useState } from "react";
import ListSongs from "../../Components/Songs/ListSongs";
import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import type { TrackView } from "../../Components/Songs/Types/TrackView";
import { ENV } from "../../Config/env";
import { getIncrementReproduction } from "../../Components/getIncrementReproduction";
import AddSongForm from "../../Components/Songs/AddSongForm";


const SongManagement = () => {

    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [track, setTrack] = useState<TrackView>(
        {
            ...tracks[Math.floor(Math.random() * tracks.length)],
            reproduccions: Math.floor(Math.random() * 20000),
            likes: {
                like: false,
                totalLikes: 0
            },
        });
    async function carregarDadesTrack() {

        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
        setTracks(listTrack);
    }

    


    useEffect(
        () => {
            carregarDadesTrack();

        }, []
    );

    const [newSong, setNewSong] = useState<boolean>(false);
function addSong() {
        setNewSong(true);
    }
    return (
        <>
            <main>
                <h1>Llistat de cancons</h1>

                {
                    tracks.length > 0 ?
                        <table>
                            <thead>
                                <title>List Songs</title>
                            </thead>
                            <tbody>
                                <ListSongs tracks={tracks} onPlay={(selectedTrack) => getIncrementReproduction(selectedTrack.id)} setTrack={setTrack} />
                            </tbody>
                        </table>
                        : <></>
                }
           
            </main>
            {
                newSong ?
                    <AddSongForm refreshSongs={carregarDadesTrack} />
                    : <button onClick={addSong}>nova</button>
            }
        </>
    )
}

export default SongManagement;