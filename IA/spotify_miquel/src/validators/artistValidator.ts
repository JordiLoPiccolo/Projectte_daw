import { countries } from "../data/country/country";
import { Artist } from "../interfaces/artist/artist";
import { CountryBD } from "../interfaces/countries/countryBD";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";
import { isValidCountry } from "./countryValidator";


export function isValidArtist(artist: Artist):boolean {
    if (!artist) {
        return false;
    }

    if (artist.aName === null || artist.rName === null || artist.country === null) {
        return false
    }

    

    const longArtistName: number = artist.aName.trim().replace(/\s+/g, " ").length;
    const longRealName: number = artist.rName.trim().replace(/\s+/g, " ").length;

    const dadesOK: boolean = longArtistName > 0 && longArtistName <= maxArtist
        && longRealName > 0 && longRealName <= maxTitol;
    
    if (!dadesOK) {
        return false;
    }
    
    const countryOK: CountryBD | undefined = countries.find(
        (c: CountryBD) => { return c.id === artist.country }
    );

    if (!countryOK) return false;
    
    return true;

}
