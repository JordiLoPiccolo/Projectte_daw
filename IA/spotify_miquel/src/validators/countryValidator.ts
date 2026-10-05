import { Country } from "../interfaces/countries/country";
import { validCountries } from "../interfaces/artist/paisos";

export function validCountry(country: unknown): Country | undefined {
    if (typeof country !== "object" || country === null) {
        return undefined;
    }

    const candidate = country as Record<string, unknown>;
    if (typeof candidate.id !== "string" || typeof candidate.name !== "string") {
        return undefined;
    }

    return validCountries.find(
        (valid: Country) => valid.id === candidate.id && valid.name === candidate.name
    );
}