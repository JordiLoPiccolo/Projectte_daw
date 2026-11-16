import { useEffect, useState, type SubmitEvent } from "react";
import { ENV } from "../../Config/env";
import type { GETArtist } from "../../APIManagement/Artists/Interface/Artist";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TrackCreate";
import { PostTrack } from "../../APIManagement/Tracks/PostTrack";
import type { AddSongFormProps } from "./Types/AddSongFormProps";

const AddSongFrom = (props:AddSongFormProps) => {

    const [artists, setArtists] = useState<GETArtist[]>([]);

     async function carregarDadesArtists() {
    
            const resposta: Response = await fetch(`${ENV.API_BASE_URL}/artists`);
            const listArtist: GETArtist[] = await resposta.json() as GETArtist[];
            setArtists(listArtist);
        }
    
            
    
    
        useEffect(
            () => {
                carregarDadesArtists();
    
            }, []
        );
        
    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const dades = new FormData(event.currentTarget);
        
        const song: TrackCreate = {
            title: String(dades.get("title") ?? "").trim(),
            artist: String(dades.get("artist") ?? "").trim(),
            duration: Number(dades.get("duration") ?? "")
        };

        
        await PostTrack(song);
        dades.set("title","");
        props.refreshSongs();
    }
    

    return (
        <>
            <h1>Afegir Canco</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>
                        Títol:
                        <input
                            type="text"
                            name="title"
                            required/>
                    </label>
                </p>
                <p>
                    <label>
                        Duration:
                        <input
                            type="number"
                            name="duaration"
                            required />
                    </label>
                </p>

                <p>
                    <p></p>
                    <label>
                        Artista:
                        <select
                            name="artist"
                            required >
                            {
                               /* artists.map(
                                    (a: GETArtist) => (
                                        <option key={a.id} value={a.id}>{a.name}</option>
                                    )
                                )    */
                            }
                        </select>
                        <button>Add</button> 
                    </label>
                    
                </p>
                <button type="submit"> 
                    Desa
                </button>
            </form>
        </>
    )
}
export default AddSongFrom;