import { randomUUID } from "crypto";

import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { playlists } from "../data/playlist/data.playlist";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { Playlist } from "../interfaces/playlist/playlist";
import { isValidPlaylist } from "../validators/playlistValidator";

export function getAllPlaylists(): PlaylistBD[] {
    return playlists;
}

export function getPlaylistById(id: string): PlaylistBD | undefined {

    return playlists.find(
        (c: PlaylistBD) => { return c.id === id }
    );

}

export function createPlaylist(PList: Playlist): SuccessService<PlaylistBD> | ErrorService {

    if (!isValidPlaylist(PList)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const PlaylistRecord: PlaylistBD = {
        id: uuid,
        title: PList.title.trim().replace(/\s+/g, " "),
        user: PList.user.trim().replace(/\s+/g, " "),

    };
    playlists.push(PlaylistRecord);

    return { success: true, data: PlaylistRecord, code: 201 };


}

export function putPlayList(PList: PlaylistBD, id: string | string[]): PutSuccessService<PlaylistBD> | ErrorService {
    if (!isValidPlaylist(PList)) {
        return { success: false, code: 400, message: "adeu" };
    }


    const index: number = playlists.findIndex(
        (t: PlaylistBD) => { return t.id === id }
    );

    if (index === -1) {
        return { success: false, code: 404, message: `PlayList invalida, com tu.` };
    }

    const PlaylistBD: PlaylistBD = {
        id: id as string,
        title: PList.title.trim().replace(/\s+/g, " "),
        user: PList.user.trim().replace(/\s+/g, " "),

    };

    return { success: true, data: PlaylistBD, code: 201, index: index };
}

export function deletePlaylist(id: string | string[]): DeleteSuccessService | ErrorService {

    const index: number = playlists.findIndex(
        (t: PlaylistBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `Playlist ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }

}