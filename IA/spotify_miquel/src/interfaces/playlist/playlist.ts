import { User } from "../user/user";

export interface Playlist{
    id: string;//pk
    title: string;
    user: User;//fk
}