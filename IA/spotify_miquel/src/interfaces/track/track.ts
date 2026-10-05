import { Artist } from "../artist/artist";

export interface Track {
    title: string,
    artist: Artist,//fk
    duration: number;
}