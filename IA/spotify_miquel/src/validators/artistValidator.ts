import { Artist } from "../interfaces/artist/artist";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";
import { isValidCountry } from "./countryValidator";


export function isValidArtist(artist: Artist):boolean {

    if (artist.aName === null || artist.rName === null || artist.country === null) {
        return false
    }
    const longArtistName: number = artist.aName.trim().replace(/\s+/g, " ").length;
    const longRealName: number = artist.rName.trim().replace(/\s+/g, " ").length;

    return longArtistName > 0 && longArtistName <= maxArtist
        && longRealName > 0 && longRealName <= maxTitol
        && isValidCountry(artist.country) !== undefined;
}
