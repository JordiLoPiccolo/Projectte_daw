import { Country } from "../countries/country";

export interface User {
    email: string;
    country: string; //FK
}

