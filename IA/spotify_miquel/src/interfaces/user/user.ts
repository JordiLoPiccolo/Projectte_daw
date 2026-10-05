import { Country } from "../country";

export interface User {
    id: string; //pk
    email: string;
    country: Country; //FK
}

export type UserInput = Omit<User, "id">;