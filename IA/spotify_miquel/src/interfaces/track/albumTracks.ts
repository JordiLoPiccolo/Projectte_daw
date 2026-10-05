import { Album } from "../artist/album";
import { Track } from "./track";

export interface AlbumTracks{
    id: string;//pk
    album: Album;//fk
    track: Track;//fk
}