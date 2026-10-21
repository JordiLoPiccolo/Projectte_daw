import type { Track } from "../Model/Track";

export function ObtenirReproduccions(track: Track): number {

    const reproduccions: number = Math.floor(Math.random() * (track.title.length * 2000));
    return reproduccions;
}