
import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";
import { PlaylistTrackBD } from "../interfaces/playlistTracks/playlistTracksBD";
import { PlaylistTrack } from "../interfaces/playlistTracks/playlistTracks";
import { isValidPlaylistTrack } from "../validators/playlistTrackValidator";
import  sql, { ConnectionPool, IResult }  from "mssql";
import { getConnection } from "../config/database";

export async function getAllPlaylistTracks(): Promise<PlaylistTrackBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from PlaylistTracks`;

    const result: IResult<PlaylistTrackBD> = await request.query(queryText);

    return result.recordset;
}

export async function getPlaylistTrackById(id: string
): Promise<SelectSuccessService<PlaylistTrackBD> | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from PlaylistTracks Where PlaylistTracks.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<PlaylistTrackBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "PlaylistTrack not found. fuck you"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };



}

export async function createPlaylistTrack(playlist: PlaylistTrack): Promise<SuccessService | ErrorService> {

    if (!isValidPlaylistTrack(playlist)) {
        return { success: false, code: 400, message: "fuck you" };
    }


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO PlaylistTrack(track_id,user_id) 
        VALUES(@track_id,@user_id)`;

    request.input("track_id", sql.UniqueIdentifier, playlist.track);
    request.input("user_id", sql.UniqueIdentifier, playlist.user);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, data: result.rowsAffected[0], code: 201 };


}

export async function putPlaylistTrack(playlist: PlaylistTrackBD, id: string | string[]): Promise<PutSuccessService<Response>| ErrorService> {
    if (!isValidPlaylistTrack(playlist)) {
        return { success: false, code: 400, message: "fuck you" };
    }

   

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE PLAYLIST SET track_id=@track_id,user_id=@user_id)
        WHERE playlistTrack.id=@id `;

    request.input("track_id", sql.UniqueIdentifier, playlist.track);
    request.input("user_id", sql.UniqueIdentifier, playlist.user);
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "PlaylistTrack not found. fuck you"
        }
    }
    return { success: true, data: result.rowsAffected[0], code: 200 };
}

export async function deletePlaylistTrack(id: string | string[]): Promise<DeleteSuccessService | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Delete from PlaylistTrack Where PlaylistTrack.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<PlaylistTrackBD> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "PlaylistTrack not found. fuck you"
        }
    }

    return {
        success: true,
        code: 204
    };
}


