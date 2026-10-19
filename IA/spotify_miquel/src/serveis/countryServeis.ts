import { randomUUID } from "crypto";

import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { CountryBD } from "../interfaces/countries/countryBD";
import { countries } from "../data/country/country";
import { Country } from "../interfaces/countries/country";
import { isValidCountry } from "../validators/countryValidator";
import sql, { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";

export async function getAllCountries(): Promise<CountryBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Country`;

    const result: IResult<CountryBD> = await request.query(queryText);

    return result.recordset;
}

export async function getCountryById(id: string
    ): Promise<SelectSuccessService<CountryBD> | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Country Where Country.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<CountryBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Country not found. fuck you"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };

   

}

export async function createCountry(country: Country): Promise<SuccessService<number> | ErrorService> {

    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    const title: string = country.name.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO COUNTRY(name) 
        VALUES(@name)`;
    
    request.input("name", sql.NVarChar, title);
 
    const result: IResult<number> = await request.query(queryText);

    return { success: true, data: result.rowsAffected[0], code: 201 };


}

export async function putCountry(country: CountryBD, id: string | string[]): Promise<PutSuccessService<number> | ErrorService> {
    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    const title: string = country.name.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE COUNTRY SET name=@name
        WHERE country.id=@id `;

    request.input("name", sql.NVarChar, title);
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Country not found. fuck you"
        }
    }
    return { success: true, data: result.rowsAffected[0], code: 200 };
}

export async function deleteCountry(id: string | string[]): Promise<DeleteSuccessService | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Delete from Country Where Country.id = @id`;
    request.input("id", sql.UniqueIdentifier, id);

    const result: IResult<CountryBD> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Country not found. fuck you"
        }
    }

    return {
        success: true,
        code: 204
    };
}





