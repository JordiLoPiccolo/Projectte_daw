import { validCountries } from "../interfaces/artist/paisos";

export function validCountry(country: string): boolean { 

    validCountries.forEach(element => {
        if (country === element) return true;
    });
    
    return false;
}