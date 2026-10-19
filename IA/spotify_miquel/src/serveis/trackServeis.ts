import { randomUUID } from "crypto";
import { tracks } from "../data/track/track";
import { Track } from "../interfaces/track/track";
import { TrackBD } from "../interfaces/track/trackBD";
import { isValidTrack } from "../validators/trackValidator";
import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";

export async function getAllTracks(): Promise<TrackBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Track`;

    const result: IResult<TrackBD> = await request.query(queryText);

    return result.recordset;
}

export async function getTrackById(idTrack: string
    ): Promise<SelectSuccessService<TrackBD> | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Track Where Track.id = @id`;
    request.input("id", sql.UniqueIdentifier, idTrack);

    const result: IResult<TrackBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found. fuck you"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };

   /* return tracks.find(
        (t: Promise<TrackBD[]>) => { return t.id === idTrack }
    );*/

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

export function putTrack(track: TrackBD, id: string | string[]): PutSuccessService<TrackBD> | ErrorService {
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "adeu" };
    }

    const idTrack: string = track.id as string;
    const index: number = tracks.findIndex(
        (t: TrackBD) => { return t.id === idTrack }
    );

    if (index === -1) {
        return { success: false, code: 404, message: `Track ${idTrack} not found lol` };
    }

    const trackBD: TrackBD = {
        id: idTrack,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist,
        duration: track.duration
    };

    return { success: true, data: trackBD, code: 201, index: index };
}

export function deleteTrack(id: string | string[]): DeleteSuccessService | ErrorService {

    const index: number = tracks.findIndex(
        (t: TrackBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `Track ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }

}


