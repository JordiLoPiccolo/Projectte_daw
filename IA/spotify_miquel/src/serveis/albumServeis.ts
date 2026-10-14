import { randomUUID } from "crypto";
import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { AlbumBD } from "../interfaces/album/albumBd";
import { albums } from "../data/album/data.album";
import { Album } from "../interfaces/album/album";
import { isValidAlbum } from "../validators/albumValidator";

export function getAllAlbums(): AlbumBD[] {
    return albums;
}

export function getAlbumById(id: string): AlbumBD | undefined {

    return albums.find(
        (t: AlbumBD) => { return t.id === id }
    );

}

export function createAlbum(album: Album): SuccessService<AlbumBD> | ErrorService {



    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const albumRecord: AlbumBD = {
        id: uuid,
        title: album.title.trim().replace(/\s+/g, " "),
        artist: album.artist,
        data: new Date,
    };
    albums.push(albumRecord);

    return { success: true, data: albumRecord, code: 201 };


}

export function putAlbum(album: AlbumBD, id: string | string[]): PutSuccessService<AlbumBD> | ErrorService {
    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "adeu" };
    }

    const idAlbum: string = album.id as string;
    const index: number = albums.findIndex(
        (t: AlbumBD) => { return t.id === idAlbum }
    );

    if (index === -1) {
        return { success: false, code: 404, message: `Album ${idAlbum} not found lol` };
    }

    const albumBD: AlbumBD = {
        id: idAlbum,
        title: album.title.trim().replace(/\s+/g, " "),
        artist: album.artist,
        data: new Date,
    };

    return { success: true, data: albumBD, code: 201, index: index };
}

export function deleteAlbum(id: string | string[]): DeleteSuccessService | ErrorService {

    const index: number = albums.findIndex(
        (t: AlbumBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `Album ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }

}


