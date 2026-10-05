import { UserInput } from "../interfaces/user/user";
import { validCountry } from "./countryValidator";

export function isValidUser(user: unknown): user is UserInput {
    if (typeof user !== "object" || user === null) {
        return false;
    }

    const candidate = user as Record<string, unknown>;
    if (typeof candidate.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email.trim())) {
        return false;
    }

    return validCountry(candidate.country) !== undefined;
}
