import { tracks } from "../data/track/track";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { TrackBD } from "../interfaces/track/trackBD";
import { createTrack, deleteTrack, getAllTracks, getTrackById, putTrack } from "../serveis/trackServeis";
import { Response,Request } from "express";

export function getAllTracksController(_req:Request,res: Response): Response {
    return res.status(200).json(getAllTracks())
}

export function getTrackByIdController(req: Request, res: Response): Response {


    const findTrack: TrackBD | undefined = getTrackById(req.params.id as string);

    if (findTrack) {
        return res.status(404).json({ message: `Track ${findTrack} not found lol` });
    }
    return res.status(200).json(findTrack);
}

export function postTrackController(req: Request, res: Response): Response {
    const result: SuccessService<TrackBD> | ErrorService = createTrack(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
    
        tracks.push((result as SuccessService<TrackBD>).data);
        return res.status(201).json(result);
}

export function putTrackController(req: Request, res: Response): Response {
    const result: SuccessService<TrackBD> | ErrorService = putTrack(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as PutSuccessService<TrackBD>).index;
    tracks[index] = (result as PutSuccessService<TrackBD>).data;


    return res.status(200).json(result);
}

export function deleteTrackController(req: Request, res: Response): Response {

     const result: DeleteSuccessService | ErrorService = deleteTrack(req.params.id as string);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        const index: number = (result as DeleteSuccessService).index;
        tracks.splice(index, 1);
    
        return res.status(204).json({ message: `Truck delated` });
}