import { albums } from "../data/album/data.album";
import { tracks } from "../data/track/track";
import { AlbumBD } from "../interfaces/album/albumBd";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";
import { SuccessService } from "../interfaces/error/successService";
import { createAlbum, deleteAlbum, getAlbumById, getAllAlbums, putAlbum } from "../serveis/albumServeis";
import { Response, Request } from "express";

export async function getAllAlbumsController(_req: Request, res: Response): Promise<Response> {
    const albumBD: AlbumBD[] = await getAllAlbums();
    return res.status(200).json(albumBD);
}

export async function getAlbumByIdController(req: Request, res: Response): Promise<Response> {

    const result: SelectSuccessService<AlbumBD> | ErrorService = await getAlbumById(req.params.id as string);


    if (!result.success) {
        return res.status(result.code).json({ message: (result as ErrorService).message });
    }
    return res.status(result.code).json(result);
}

export async function postAlbumController(req: Request, res: Response): Promise<Response> {

    const result: SuccessService<AlbumBD> | ErrorService = await createAlbum(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        return res.status(201).json(result);
}

export async function putAlbumController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService<number> | ErrorService = await putAlbum(req.body,req.params.id as string);

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