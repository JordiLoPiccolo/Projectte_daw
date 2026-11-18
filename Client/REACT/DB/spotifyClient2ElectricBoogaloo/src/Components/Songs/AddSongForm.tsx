import { useEffect, useState, type SubmitEvent } from "react";
import { ENV } from "../../Config/env";
import type { GETArtist } from "../../APIManagement/Artists/Interface/Artist";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TrackCreate";
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

        
        await props.submit(song);
        
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
                            defaultValue={props.song?props.song.title:""}
                            required/>
                    </label>
                </p>
                <p>
                    <label>
                        Duration:
                        <input
                            type="number"
                            name="duaration"
                            defaultValue={props.song ? props.song.duration : ""}
                            required />
                    </label>
                </p>

                <p>
                    <p></p>
                    <label>
                        Artista:
                        {
                            artists.length > 0
                                ?
                                <select
                                name="artist"
                                defaultValue={props.song?.artist_id}
                                required >
                                {
                                    artists.map(
                                         (a: GETArtist) => (
                                             <option key={a.id} value={a.id}>{a.name}</option>
                                         )
                                     )    
                                }
                                </select>
                                :<>Cagant els artistes</>
                        }
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