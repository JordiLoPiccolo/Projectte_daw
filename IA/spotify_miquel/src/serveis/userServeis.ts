import { randomUUID } from "crypto";
import { UserBD } from "../interfaces/user/userBD";
import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { users } from "../data/user/users";
import { User } from "../interfaces/user/user";
import { isValidUser } from "../validators/userValidator";

export function getAllUsers(): UserBD[] {
    return users;
}

export function getUserById(id: string): UserBD | undefined {

    return users.find(
        (t: UserBD) => { return t.id === id }
    );

}

export function createUser(user: User): SuccessService<UserBD> | ErrorService {

    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const userRecord: UserBD = {
        id: uuid,
        email: user.email.trim().replace(/\s+/g, " "),
        country: user.country,
    };
    users.push(userRecord);

    return { success: true, data: userRecord, code: 201 };


}

export function putTrack(user: UserBD, id: string | string[]): PutSuccessService<UserBD> | ErrorService {
    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "adeu" };
    }

    const idUser: string = user.id as string;
    const index: number = users.findIndex(
        (t: UserBD) => { return t.id === id }
    );

    if (index === -1) {
        return { success: false, code: 404, message: `Track ${id} not found lol` };
    }

    const userBD: UserBD = {
        id: id as string,
        email: user.email.trim().replace(/\s+/g, " "),
        country: user.country,
    };

    return { success: true, data: userBD, code: 201, index: index };
}

export function deleteTrack(id: string | string[]): DeleteSuccessService | ErrorService {

    const index: number = users.findIndex(
        (t: UserBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `Track ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }

}


