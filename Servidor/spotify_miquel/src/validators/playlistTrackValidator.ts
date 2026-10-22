import { playlists } from "../data/playlist/data.playlist";
import { tracks } from "../data/track/track";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { PlaylistTrack } from "../interfaces/playlistTracks/playlistTracks";
import { TrackBD } from "../interfaces/track/trackBD";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";


export function isValidPlaylistTrack(ATrack: PlaylistTrack): boolean {
    if (!ATrack) {
        return false;
    }

    if (ATrack.playlist === null || ATrack.track === null) {
        return false
    }



    const longArtistName: number = ATrack.playlist.trim().replace(/\s+/g, " ").length;
    const longRealName: number = ATrack.track.trim().replace(/\s+/g, " ").length;

    const dadesOK: boolean = longArtistName > 0 && longArtistName <= maxArtist
        && longRealName > 0 && longRealName <= maxTitol;

    if (!dadesOK) {
        return false;
    }

    const PlaylistOK: PlaylistBD | undefined = playlists.find(
        (c: PlaylistBD) => { return c.id === ATrack.playlist }
    );

    if (!PlaylistOK) return false;

    const TrackOK: TrackBD | undefined = tracks.find(
        (c: TrackBD) => { return c.id === ATrack.track }
    );

    if (!TrackOK) return false;

    return true;

}