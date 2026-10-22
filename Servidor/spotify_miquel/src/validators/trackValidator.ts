import { Track } from "../interfaces/track/track";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";
export function isValidTrack(track: Track): boolean {
    
    if (!track) {
        return false;
    }

    if (typeof track.title !== "string" || !track.artist
        || typeof track.duration !== "number" || !Number.isFinite(track.duration)) {
        return false;
    }

    const longTitol: number = track.title.trim().replace(/\s+/g, " ").length



    if (longTitol === 0 || longTitol > maxTitol) { return false }
    if (track.duration < 1) { return false; }

    return true;
}