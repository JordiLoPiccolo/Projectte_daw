import { Artist } from "./artist";

export interface Album{
    id: string;//pk
    artist: Artist;//fk
    data: Date;
}