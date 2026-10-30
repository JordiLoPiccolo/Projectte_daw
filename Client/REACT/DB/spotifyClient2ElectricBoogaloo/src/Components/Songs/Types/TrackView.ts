import type { Like } from "../../../Model/Like";

export interface TrackView {
    title: string;
    artist: string;
    duration: number;
    likes: Like; 
    reproduccions: number;
}