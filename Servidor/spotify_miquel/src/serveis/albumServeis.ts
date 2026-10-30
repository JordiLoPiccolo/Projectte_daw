import { randomUUID } from "crypto";
import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { AlbumBD } from "../interfaces/album/albumBd";
import { albums } from "../data/album/data.album";
import { Album } from "../interfaces/album/album";
import { isValidAlbum } from "../validators/albumValidator";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";

export async function getAllAlbums(): Promise<AlbumBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Album`;

    const result: IResult<AlbumBD> = await request.query(queryText);

    return result.recordset;
}

export async function getAlbumById(id: string
): Promise<SelectSuccessService<AlbumBD> | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Album Where Album.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<AlbumBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Album not found. fuck you"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };



}

export async function createAlbum(album: Album): Promise<SuccessService<number> | ErrorService> {

    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    const title: string = album.title.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO ALBUM(title,artist_id,date) 
        VALUES(@title,@artist_id,@date)`;

    request.input("title", sql.NVarChar, title);
    request.input("artist_id", sql.UniqueIdentifier, album.artist);
    request.input("date", sql.Date, album.data);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, data: result.rowsAffected[0], code: 201 };


}

export async function putAlbum(album: AlbumBD, id: string | string[]): Promise<PutSuccessService<number> | ErrorService> {
    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    const title: string = album.title.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE ALBUM SET title=@title,artist_id=@artist_id,date=@date)
        WHERE album.id=@id `;

    request.input("title", sql.NVarChar, title);
    request.input("artist_id", sql.UniqueIdentifier, album.artist);
    request.input("date", sql.Date, album.data);
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Album not found. fuck you"
        }
    }
    return { success: true, data: result.rowsAffected[0], code: 200 };
}

export async function deleteAlbum(id: string | string[]): Promise<DeleteSuccessService | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Delete from Album Where Album.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<AlbumBD> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Album not found. fuck you"
        }
    }

    return {
        success: true,
        code: 204
    };
}


