import { Artist } from "../interfaces/artist/artist";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";
import { validCountry } from "./countryValidator";

export function isValidArtist(artist: unknown): artist is Artist {
    if (typeof artist !== "object" || artist === null) {
        return false;
    }

    const candidate = artist as Record<string, unknown>;
    if (typeof candidate.aName !== "string" || typeof candidate.rName !== "string") {
        return false;
    }

    const longArtistName: number = candidate.aName.trim().replace(/\s+/g, " ").length;
    const longRealName: number = candidate.rName.trim().replace(/\s+/g, " ").length;

    return longArtistName > 0 && longArtistName <= maxArtist
        && longRealName > 0 && longRealName <= maxTitol
        && validCountry(candidate.country) !== undefined;
}
