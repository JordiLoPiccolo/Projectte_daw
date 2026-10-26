import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { Artist } from "../interfaces/artist/artist";
import { isValidArtist } from "../validators/artistValidator";
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

export async function createArtist(artist: Artist): Promise<SuccessService<number> | ErrorService> {

    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    const title: string = artist.rName.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO ARTIST(name,pseudonym,country_id) 
        VALUES(@name,@pseudonym,@country_id)`;
    
    request.input("name", sql.NVarChar, title);
    request.input("pseudonym", sql.NVarChar, artist.aName);
    request.input("country_id", sql.UniqueIdentifier, artist.country);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, data: result.rowsAffected[0], code: 201 };


}

export async function putArtist(artist: ArtistBD, id: string | string[]): Promise<PutSuccessService<number> | ErrorService> {
    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    const title: string = artist.rName.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE Artist SET name=@name,pseudonym=@pseudonym,country_id=@country_id)
        WHERE artist.id=@id `;

    request.input("name", sql.NVarChar, title);
    request.input("pseudonym", sql.NVarChar, artist.aName);
    request.input("country_id", sql.UniqueIdentifier, artist.country);
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Artist not found. fuck you"
        }
    }
    return { success: true, data: result.rowsAffected[0], code: 200 };
}

export async function deleteArtist(id: string | string[]): Promise<DeleteSuccessService | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Delete from Artist Where Artist.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<ArtistBD> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Artist not found. fuck you"
        }
    }

    return {
        success: true,
        code: 204
    };
}



