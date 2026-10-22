import { randomUUID } from "crypto";

import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { CountryBD } from "../interfaces/countries/countryBD";
import { countries } from "../data/country/country";
import { Country } from "../interfaces/countries/country";
import { isValidCountry } from "../validators/countryValidator";
import { HistoryBD } from "../interfaces/history/historyBD";
import { histories } from "../data/history/data.history";
import { History } from "../interfaces/history/history";
import { isValidHistory } from "../validators/historyValidator";
import { UserBD } from "../interfaces/user/userBD";

export function getAllHistories(): HistoryBD[] {
    return histories;
}

export function getHistoryById(id: string): HistoryBD | undefined {

    return histories.find(
        (c: HistoryBD) => { return c.id === id }
    );

}

export function createHistory(history: History): SuccessService<HistoryBD> | ErrorService {



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

    return { success: true, data: historyRecord, code: 201 };


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

    return { success: true, data: historyBD, code: 201, index: index };
}

export function deleteHistory(id: string | string[]): DeleteSuccessService | ErrorService {

    const index: number = histories.findIndex(
        (t: HistoryBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `History ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }

}


