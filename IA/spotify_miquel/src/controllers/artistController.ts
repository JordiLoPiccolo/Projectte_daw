import { artists } from "../data/artist/data.artist";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";
import { SuccessService } from "../interfaces/error/successService";
import { createArtist, deleteArtist, getAllArtist, getArtistById, putArtist } from "../serveis/artistServeis";
import { Response,Request } from "express";

export async function getAllArtistsController(_req: Request, res: Response): Promise<Response> {
    const artistBD: ArtistBD[] = await getAllArtist();
    return res.status(200).json(artistBD);
}

export async function getArtistByIdController(req: Request, res: Response): Promise<Response> {

    const result: SelectSuccessService<ArtistBD> | ErrorService = await getArtistById(req.params.id as string);


    if (!result.success) {
        return res.status(result.code).json({ message: (result as ErrorService).message });
    }
    return res.status(result.code).json(result);
}

export async function postArtistController(req: Request, res: Response): Promise<Response> {

    const result: SuccessService<ArtistBD> | ErrorService = await createArtist(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        return res.status(201).json(result);
}

export async function putArtistController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService<number> | ErrorService = await putArtist(req.body,req.params.id as string);

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