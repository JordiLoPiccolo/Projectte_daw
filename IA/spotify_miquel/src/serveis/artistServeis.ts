import { randomUUID } from "crypto";
import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../data/artist/data.artist";
import { Artist } from "../interfaces/artist/artist";
import { isValidArtist } from "../validators/artistValidator";
import { CountryBD } from "../interfaces/countries/countryBD";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";

export async function getAllArtists(): Promise<ArtistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Artist`;

    const result: IResult<ArtistBD> = await request.query(queryText);

    return result.recordset;
}


export async function getArtistById(id: string
    ): Promise<SelectSuccessService<ArtistBD> | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Artist Where Artist.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<ArtistBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Artist not found. fuck you"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };

   

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
