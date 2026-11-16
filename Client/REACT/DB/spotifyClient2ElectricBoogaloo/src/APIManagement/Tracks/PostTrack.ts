import { ENV } from "../../Config/env";
import type { TrackCreate } from "./Interfaces/TrackCreate";


export async function PostTrack(newTrack:TrackCreate){
    const response: Response = await fetch(`${ENV.API_BASE_URL}/tracks`, {
        method: "POST",
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

