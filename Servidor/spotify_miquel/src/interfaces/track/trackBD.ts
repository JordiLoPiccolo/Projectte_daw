import { Track } from "./track";

export interface TrackBD extends Track{
    id: string,
    artist_id: string;
}