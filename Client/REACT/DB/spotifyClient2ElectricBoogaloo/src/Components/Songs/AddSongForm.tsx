import { useEffect, useState } from "react";
import { ENV } from "../../Config/env";
import type { GETArtist } from "../../APIManagement/Artists/Interface/Artist";

const AddSongFrom = () => {

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
    

    return (
        <>
            <h1>Afegir Canco</h1>
            <form>
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
                    <label>
                        Artista:
                        <select
                            name="artist"
                            required />
                        <button>Add</button> 
                    </label>
                    
                </p>
            </form>
        </>
    )
}
export default AddSongFrom;