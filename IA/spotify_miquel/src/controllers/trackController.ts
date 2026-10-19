import { tracks } from "../data/track/track";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";
import { SuccessService } from "../interfaces/error/successService";
import { TrackBD } from "../interfaces/track/trackBD";
import { createTrack, deleteTrack, getAllTracks, getTrackById, putTrack } from "../serveis/trackServeis";
import { Response,Request } from "express";

export async function getAllTracksController(_req: Request, res: Response): Promise<Response> {
    const tracksBD: TrackBD[] = await getAllTracks();
    return res.status(200).json(tracksBD);
}

export async function getTrackByIdController(req: Request, res: Response): Promise<Response> {

    const result: SelectSuccessService<TrackBD> | ErrorService = await getTrackById(req.params.id as string);


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