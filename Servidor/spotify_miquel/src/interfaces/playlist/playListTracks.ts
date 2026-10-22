import { Track } from "../track/track";
import { Playlist } from "./playlist";

export interface PlaylistTracks{
    id: string;//pk
    playlist: Playlist;//fk
    track: Track;//fk
}