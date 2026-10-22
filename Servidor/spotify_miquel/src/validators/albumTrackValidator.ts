import { albums } from "../data/album/data.album";
import { tracks } from "../data/track/track";
import { AlbumBD } from "../interfaces/album/albumBd";
import { AlbumTrack } from "../interfaces/albumTracks/albumTracks";
import { TrackBD } from "../interfaces/track/trackBD";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";


export function isValidAlbumTrack(ATrack: AlbumTrack):boolean {
    if (!ATrack) {
        return false;
    }

    if (ATrack.album === null || ATrack.track === null ) {
        return false
    }

    

    const longArtistName: number = ATrack.album.trim().replace(/\s+/g, " ").length;
    const longRealName: number = ATrack.track.trim().replace(/\s+/g, " ").length;

    const dadesOK: boolean = longArtistName > 0 && longArtistName <= maxArtist
        && longRealName > 0 && longRealName <= maxTitol;
    
    if (!dadesOK) {
        return false;
    }
    
    const AlbumOK: AlbumBD | undefined = albums.find(
        (c: AlbumBD) => { return c.id === ATrack.album }
    );

    if (!AlbumOK) return false;

    const TrackOK: TrackBD | undefined = tracks.find(
        (c: TrackBD) => { return c.id === ATrack.track }
    );

    if (!TrackOK) return false;
    
    return true;

}
