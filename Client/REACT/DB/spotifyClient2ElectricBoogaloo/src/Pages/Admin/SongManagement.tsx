import { useEffect, useState } from "react";
import ListSongs from "../../Components/Songs/ListSongs";
import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import type { TrackView } from "../../Components/Songs/Types/TrackView";
import { ENV } from "../../Config/env";
import { getIncrementReproduction } from "../../Components/getIncrementReproduction";
import AddSongForm from "../../Components/Songs/AddSongForm";
import type { FormState } from "./Types/FormState";
import type { Track } from "../../Model/Track";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TrackCreate";
import { PostTrack } from "../../APIManagement/Tracks/PostTrack";
import { PutTrack } from "../../APIManagement/Tracks/PutTrack";


const SongManagement = () => {

    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [newSong, setNewSong] = useState<FormState>({ mode: "none" });
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
  
    function addSong() {
        setNewSong({ mode: "new" });
    }
  
    function edit(t:Track) {
        setNewSong({
            mode: "edit",
            song: t
        });
    }

    async function save(t: TrackCreate) {
        await PostTrack(t);
        await carregarDadesTrack();
        setNewSong({ mode: "none" });
    }

    async function update(t: TrackCreate) {
        const id = newSong.mode === "edit" ? newSong.song.id:"";
        await PutTrack(t,id);
        await carregarDadesTrack();
        setNewSong({ mode: "none" });
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
                                <ListSongs tracks={tracks} edit={edit} onPlay={(selectedTrack) => getIncrementReproduction(selectedTrack.id)} setTrack={setTrack} />
                            </tbody>
                        </table>
                        : <></>
                }

            </main>
            {
                newSong.mode === "new" ?
                    <AddSongForm submit={ (t) => save(t)} />
                    : newSong.mode === "edit" ?
                        <AddSongForm submit={(t) => update(t)} song={newSong.song} />
                        :<button onClick={addSong}>nove</button>
            }
        </>
    )
}

export default SongManagement;