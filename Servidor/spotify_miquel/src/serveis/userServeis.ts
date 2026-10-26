import { UserBD } from "../interfaces/user/userBD";
import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { User } from "../interfaces/user/user";
import { isValidUser } from "../validators/userValidator";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";

export async function getAllUsers(): Promise<UserBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from User`;

    const result: IResult<UserBD> = await request.query(queryText);

    return result.recordset;
}

export async function getUserById(id: string
): Promise<SelectSuccessService<UserBD> | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from User Where User.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<UserBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found. fuck you"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };



}

export async function createUser(user: User): Promise<SuccessService<number> | ErrorService> {

    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "fuck you" };
    }



    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO USER(email,country_id) 
        VALUES(@email,@country_id)`;

    request.input("email", sql.NVarChar, user.email);
    request.input("country_id", sql.UniqueIdentifier, user.country);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, data: result.rowsAffected[0], code: 201 };


}

export async function putUser(track: UserBD, id: string | string[]): Promise<PutSuccessService<number> | ErrorService> {
    if (!isValidUser(track)) {
        return { success: false, code: 400, message: "fuck you" };
    }


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE USER SET country_id=@country_id,email=@email)
        WHERE user.id=@id `;

    request.input("country_id", sql.UniqueIdentifier, track.country);
    request.input("email", sql.NVarChar, track.email);
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found. fuck you"
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


