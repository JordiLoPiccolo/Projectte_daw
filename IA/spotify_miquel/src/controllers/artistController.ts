import { artists } from "../data/artist/data.artist";
import { tracks } from "../data/track/track";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { createArtist, deleteArtist, getAllArtist, getArtistById, putArtist } from "../serveis/artistServeis";
import { createTrack, deleteTrack, getAllTracks, getTrackById, putTrack } from "../serveis/trackServeis";
import { Response,Request } from "express";

export function getAllArtistsController(_req:Request,res: Response): Response {
    return res.status(200).json(getAllArtist());
}

export function getArtistByIdController(req: Request, res: Response): Response {


    const findArtist: ArtistBD | undefined = getArtistById(req.params.id as string);

    if (findArtist) {
        return res.status(404).json({ message: `Artist ${findArtist} not found lol` });
    }
    return res.status(200).json(findArtist);
}

export function postArtistController(req: Request, res: Response): Response {
    const result: SuccessService<ArtistBD> | ErrorService = createArtist(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
    
        artists.push((result as SuccessService<ArtistBD>).data);
        return res.status(201).json(result);
}

export function putArtistController(req: Request, res: Response): Response {
    const result: SuccessService<ArtistBD> | ErrorService = putArtist(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as PutSuccessService<ArtistBD>).index;
    artists[index] = (result as PutSuccessService<ArtistBD>).data;


    return res.status(200).json(result);
}

export function deleteArtistController(req: Request, res: Response): Response {

     const result: DeleteSuccessService | ErrorService = deleteArtist(req.params.id as string);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        const index: number = (result as DeleteSuccessService).index;
        artists.splice(index, 1);
    
        return res.status(204).json({ message: `Atrist delated` });
}