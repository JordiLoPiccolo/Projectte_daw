import { randomUUID } from "crypto";

import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { playlists } from "../data/playlist/data.playlist";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { Playlist } from "../interfaces/playlist/playlist";
import { isValidPlaylist } from "../validators/playlistValidator";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";

export async function getAllPlaylists(): Promise<PlaylistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Playlist`;

    const result: IResult<PlaylistBD> = await request.query(queryText);

    return result.recordset;
}

export async function getPlaylistById(id: string
): Promise<SelectSuccessService<PlaylistBD> | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Playlist Where Playlist.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<PlaylistBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found. fuck you"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };



}

export async function createTrack(track: Track): Promise<SuccessService<number> | ErrorService> {

    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    const title: string = track.title.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO TRACK(title,artist_id,duration) 
        VALUES(@title,@artist_id,@duration)`;

    request.input("title", sql.NVarChar, title);
    request.input("artist_id", sql.UniqueIdentifier, track.artist);
    request.input("duration", sql.Numeric, track.duration);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, data: result.rowsAffected[0], code: 201 };


}

export async function putTrack(track: TrackBD, id: string | string[]): Promise<PutSuccessService<number> | ErrorService> {
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    const title: string = track.title.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE TRACK SET title=@title,artist_id=@artist_id,duration=@duration)
        WHERE track.id=@id `;

    request.input("title", sql.NVarChar, title);
    request.input("artist_id", sql.UniqueIdentifier, track.artist);
    request.input("duration", sql.Numeric, track.duration);
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found. fuck you"
        }
    }
    return { success: true, data: result.rowsAffected[0], code: 200 };
}

export async function deleteTrack(id: string | string[]): Promise<DeleteSuccessService | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Delete from Track Where Track.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<TrackBD> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found. fuck you"
        }
    }

    return {
        success: true,
        code: 204
    };
}


