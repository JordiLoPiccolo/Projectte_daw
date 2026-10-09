import { tracks } from "../data/track/track";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { TrackBD } from "../interfaces/track/trackBD";
import { createTrack, deleteTrack, getAllTracks, getTrackById, putTrack } from "../serveis/trackServeis";
import { Response,Request } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, putUser } from "../serveis/userServeis";
import { UserBD } from "../interfaces/user/userBD";
import { users } from "../data/user/users";
import { User } from "../interfaces/user/user";

export function getAllUsersController(_req:Request,res: Response): Response {
    return res.status(200).json(getAllUsers());
}

export function getUserByIdController(req: Request, res: Response): Response {


    const findUser: UserBD | undefined = getUserById(req.params.id as string);

    if (findUser) {
        return res.status(404).json({ message: `Track ${findUser} not found lol` });
    }
    return res.status(200).json(findUser);
}

export function postUserController(req: Request, res: Response): Response {
    const result: SuccessService<UserBD> | ErrorService = createUser(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
    
        users.push((result as SuccessService<UserBD>).data);
        return res.status(201).json(result);
}

export function putUserController(req: Request, res: Response): Response {
    const result: SuccessService<UserBD> | ErrorService = putUser(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as PutSuccessService<UserBD>).index;
    users[index] = (result as PutSuccessService<UserBD>).data;


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