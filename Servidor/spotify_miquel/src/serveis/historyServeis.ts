import { randomUUID } from "crypto";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";
import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { histories } from "../data/history/data.history";
import { History } from "../interfaces/history/history";
import { isValidHistory } from "../validators/historyValidator";

export function getAllHistories(): HistoryBD[] {
    return histories;
}

export function getHistoryById(id: string): HistoryBD | undefined {

    return histories.find(
        (c: HistoryBD) => { return c.id === id }
    );

}

export function createHistory(history: History): SuccessService | ErrorService {



    if (!isValidHistory(history)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const historyRecord: HistoryBD = {
        id: uuid,
        user: history.user.trim().replace(/\s+/g, " "),
        track: history.track.trim().replace(/\s+/g, " "),
        data: new Date(),

    };
    histories.push(historyRecord);

    return { success: true, data: 0, code: 201 };


}

export function putHistory(history: HistoryBD, id: string | string[]): PutSuccessService<HistoryBD> | ErrorService {
    if (!isValidHistory(history)) {
        return { success: false, code: 400, message: "adeu" };
    }


    const index: number = histories.findIndex(
        (t: HistoryBD) => { return t.id === id }
    );

    if (index === -1) {
        return { success: false, code: 404, message: `Pais invalid, com tu.` };
    }

    const historyBD: HistoryBD = {
        id: id as string,
        user: history.user.trim().replace(/\s+/g, " "),
        track: history.track.trim().replace(/\s+/g, " "),
        data: new Date(),

    };

    return { success: true, data: 0, code: 201 };
}

export function deleteHistory(id: string | string[]): DeleteSuccessService | ErrorService {

    const index: number = histories.findIndex(
        (t: HistoryBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `History ${id} not found lol` };
    }

    return { success: true, code: 204 }

}

export async function addTrackUserHistory(historyTrack: History): Promise<SuccessService | ErrorService> {

    if (!isValidHistory(historyTrack)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO History(user_id,track_id) 
        VALUES(@user_id,@track_id)`;
    
    request.input("user_id", sql.UniqueIdentifier, historyTrack.user);
    request.input("track_id", sql.UniqueIdentifier, historyTrack.track);


    const result: IResult<number> = await request.query(queryText);

    return { success: true, data: result.rowsAffected[0], code: 201 };


}


