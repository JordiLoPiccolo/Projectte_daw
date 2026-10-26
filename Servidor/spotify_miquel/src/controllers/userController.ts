import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { Response,Request } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, putUser } from "../serveis/userServeis";
import { UserBD } from "../interfaces/user/userBD";
import { users } from "../data/user/users";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";

export async function getAllUsersController(_req: Request, res: Response): Promise<Response> {
    const usersBD: UserBD[] = await getAllUsers();
    return res.status(200).json(usersBD);
}

export async function getUserByIdController(req: Request, res: Response): Promise<Response> {

    const result: SelectSuccessService<UserBD> | ErrorService = await getUserById(req.params.id as string);


    if (!result.success) {
        return res.status(result.code).json({ message: (result as ErrorService).message });
    }
    return res.status(result.code).json(result);
}

export async function postTrackController(req: Request, res: Response): Promise<Response> {

    const result: SuccessService<TrackBD> | ErrorService = await createTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    return res.status(201).json(result);
}

export async function putTrackController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService<number> | ErrorService = await putTrack(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    return res.status(201).json(result);
}

export async function deleteTrackController(req: Request, res: Response): Promise<Response> {
    const result: DeleteSuccessService | ErrorService = await deleteTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    return res.status(201).send();
}