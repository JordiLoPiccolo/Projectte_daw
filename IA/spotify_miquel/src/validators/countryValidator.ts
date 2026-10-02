import { validCountries } from "../interfaces/artist/paisos";

export function validCountry(country: string): string | undefined { 

    return validCountries.find(
        (c: string) => { return c == country }
    );
        
    
   
}