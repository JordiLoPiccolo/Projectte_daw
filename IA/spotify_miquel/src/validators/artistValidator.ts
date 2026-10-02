import { Artist } from "../interfaces/artist/artist";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";
import { validCountry } from "./countryValidator";

export function isValidArtist(artist: Artist): boolean {
    if (artist.aName === null || artist.rName === null || artist.country === null) {
        return false;
    }

    const longArtistName: number = artist.aName.trim().replace(/\s+/g, " ").length;
    const longRealName: number = artist.rName.trim().replace(/\s+/g, " ").length;
    const country: string = artist.country.trim().replace(/\s+/g, " ");

    if (longArtistName === 0 || longArtistName > maxArtist) { return false; }
    if (longRealName === 0 || longRealName > maxTitol) { return false; }
    if (!validCountry(country)) { return false; }

    return true;
}
