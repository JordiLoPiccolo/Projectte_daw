import type { GETPlaylist } from "../../../APIManagement/Playlists/Interface/Playlist";
import type { GETPlaylistTracks } from "../../../APIManagement/PlaylistTrack/Interface/PlaylistTrack";
import type { GETTrack } from "../../../APIManagement/Tracks/Interfaces/Track";

export interface PlaylistCardProps {
    playlists: GETPlaylist[];
    playlistTracks: GETPlaylistTracks[];
    tracks: GETTrack[];
    onPlay: (track: GETTrack) => void;
}
