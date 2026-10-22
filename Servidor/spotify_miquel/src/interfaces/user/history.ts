import { Track } from "../track/track";
import { User } from "./user";

export interface History{
    id: string;//pk
    user: User;//fk
    track: Track;//fk
    data: Date;
}