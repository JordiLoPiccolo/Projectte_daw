import { randomUUID } from "crypto";
import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../data/artist/data.artist";
import { Artist } from "../interfaces/artist/artist";
import { isValidArtist } from "../validators/artistValidator";

export function getAllArtist(): ArtistBD[] {
    return artists;
}

export function getArtistById(id: string): ArtistBD | undefined {

    return artists.find(
        (t: ArtistBD) => { return t.id === id }
    );

}

export function createArtist(artist: Artist): SuccessService<ArtistBD> | ErrorService {



    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const ArtistRecord: ArtistBD = {
        id: uuid,
        aName: artist.aName.trim().replace(/\s+/g, " "),
        rName: artist.rName,
        country: artist.country
    };
    artists.push(ArtistRecord);

    return { success: true, data: ArtistRecord, code: 201 };


}

export function putArtist(artist: ArtistBD, id: string | string[]): PutSuccessService<ArtistBD> | ErrorService {
    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "adeu" };
    }

    const idTrack: string = artist.id as string;
    const index: number = artists.findIndex(
        (t: ArtistBD) => { return t.id === idTrack }
    );

    if (index === -1) {
        return { success: false, code: 404, message: `Artist ${idTrack} not found lol` };
    }

    const artistBD: ArtistBD = {
        id: idTrack,
        aName: artist.aName.trim().replace(/\s+/g, " "),
        rName: artist.rName,
        country: artist.country
    };

    return { success: true, data: artistBD, code: 201, index: index };
}

export function deleteArtist(id: string | string[]): DeleteSuccessService | ErrorService {

    const index: number = artists.findIndex(
        (t: ArtistBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `Artist ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }

}
