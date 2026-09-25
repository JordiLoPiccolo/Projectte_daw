import { Track } from "../interfaces/track/track";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";
export function isValidTrack(track: Track): boolean {
    
    if (track.artist === null || track.title === null || track.duration === null) {
        return false
    }

    const longTitol: number = track.title.trim().replace(/\s+/g, " ").length
    const longArtist: number = track.artist.trim().replace(/\s+/g, " ").length


    if (longArtist === 0 || longArtist > maxArtist) { return false; }
    if (longTitol === 0 || longTitol > maxTitol) { return false }
    if (track.duration < 1) { return false; }

    return true;
}