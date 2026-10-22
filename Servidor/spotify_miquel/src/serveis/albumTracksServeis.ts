import { randomUUID } from "crypto";

import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { AlbumTrackBD } from "../interfaces/albumTracks/albumTracksBD";
import { albumTracks } from "../data/albumTracks/data.albumTracks";
import { AlbumTrack } from "../interfaces/albumTracks/albumTracks";
import { isValidAlbumTrack } from "../validators/albumTrackValidator";

export function getAllAlbumTracks(): AlbumTrackBD[] {
    return albumTracks;
}



export function createAlbumTrack(ATrack: AlbumTrack): SuccessService<AlbumTrackBD> | ErrorService {

    if (!isValidAlbumTrack(ATrack)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const AlbumTrackRecord: AlbumTrackBD = {
        id: uuid,
        album: ATrack.album.trim().replace(/\s+/g, " "),
        track: ATrack.track.trim().replace(/\s+/g, " "),

    };
    albumTracks.push(AlbumTrackRecord);

    return { success: true, data: AlbumTrackRecord, code: 201 };


}

export function deleteAlbumTrack(id: string | string[]): DeleteSuccessService | ErrorService {

    const index: number = albumTracks.findIndex(
        (t: AlbumTrackBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `AlbumTrack ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }

}