import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { Response, Request } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, putUser } from "../serveis/userServeis";
import { UserBD } from "../interfaces/user/userBD";
import { users } from "../data/user/users";

export function getAllUsersController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllUsers());
}

export function getUserByIdController(req: Request, res: Response): Response {


    const findUser: UserBD | undefined = getUserById(req.params.id as string);

    if (!findUser) {
        return res.status(404).json({ message: `Track ${findUser} not found lol` });
    }
    return res.status(200).json(findUser);
}

export function postUserController(req: Request, res: Response): Response {
    const result: SuccessServiceUserBD> | ErrorService = createUser(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    users.push((result as SuccessServiceUserBD >).data);
    return res.status(201).json(result);
}

export function putUserController(req: Request, res: Response): Response {
    const result: SuccessServiceUserBD> | ErrorService = putUser(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as PutSuccessServiceUserBD >).index;
    users[index] = (result as PutSuccessServiceUserBD >).data;


    return res.status(200).json(result);
}

export function deleteUserController(req: Request, res: Response): Response {

    const result: DeleteSuccessService | ErrorService = deleteUser(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index;
    users.splice(index, 1);

    return res.status(204).json({ message: `Suser delated` });
}