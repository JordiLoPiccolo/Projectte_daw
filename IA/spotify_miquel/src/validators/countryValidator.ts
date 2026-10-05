import { Country } from "../interfaces/countries/country";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";
import { validCountries } from "../interfaces/artist/paisos";

export function isValidCountry(country: Country):Country| undefined{
    
       if (country.id === null || country.name === null) {
           return undefined
       }
       
       const longTitol: number = country.name.trim().replace(/\s+/g, " ").length
    
       if (longTitol === 0 || longTitol > maxTitol) { return undefined }
       
       return country;
}