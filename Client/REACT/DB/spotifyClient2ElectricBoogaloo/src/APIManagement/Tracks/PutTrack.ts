import { ENV } from "../../Config/env";
import type { TrackCreate } from "./Interfaces/TrackCreate";


export async function PutTrack(newTrack:TrackCreate, id : string){
    const response: Response = await fetch(`${ENV.API_BASE_URL}/tracks/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newTrack)
    });
    if (!response.ok) {
        return false;
    };
    const result = await response.json();
};
