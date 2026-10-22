import { randomUUID } from "crypto";

import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { AlbumTrackBD } from "../interfaces/albumTracks/albumTracksBD";
import { albumTracks } from "../data/albumTracks/data.albumTracks";
import { AlbumTrack } from "../interfaces/albumTracks/albumTracks";
import { isValidAlbumTrack } from "../validators/albumTrackValidator";
import { PlaylistTrackBD } from "../interfaces/playlistTracks/playlistTracksBD";
import { playlistTracks } from "../data/playlistTracks/data.playlistTracks";
import { PlaylistTrack } from "../interfaces/playlistTracks/playlistTracks";
import { isValidPlaylistTrack } from "../validators/playlistTrackValidator";

export function getAllPlaylistTracks(): PlaylistTrackBD[] {
    return playlistTracks;
}



export function createPlaylistTrack(PTrack: PlaylistTrack): SuccessService<PlaylistTrackBD> | ErrorService {
 
    if (!isValidPlaylistTrack(PTrack)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const PlaylistTrackRecord: PlaylistTrackBD = {
        id: uuid,
        playlist: PTrack.playlist.trim().replace(/\s+/g, " "),
        track: PTrack.track.trim().replace(/\s+/g, " "),

    };
    playlistTracks.push(PlaylistTrackRecord);

    return { success: true, data: PlaylistTrackRecord, code: 201 };


}

export function deletePlaylistTrack(id: string | string[]): DeleteSuccessService | ErrorService {

    const index: number = playlistTracks.findIndex(
        (t: PlaylistTrackBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `PlaylistTrack ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }

}