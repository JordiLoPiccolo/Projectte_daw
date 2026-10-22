import { albums } from "../data/album/data.album";
import { tracks } from "../data/track/track";
import { AlbumBD } from "../interfaces/album/albumBd";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { createAlbum, deleteAlbum, getAlbumById, getAllAlbums, putAlbum } from "../serveis/albumServeis";
import { Response, Request } from "express";

export function getAllAlbumController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllAlbums());
}

export function getAlbumByIdController(req: Request, res: Response): Response {


    const findAlbum: AlbumBD | undefined = getAlbumById(req.params.id as string);

    if (!findAlbum) {
        return res.status(404).json({ message: `Album ${findAlbum} not found lol` });
    }
    return res.status(200).json(findAlbum);
}

export function postAlbumController(req: Request, res: Response): Response {
    const result: SuccessService<AlbumBD> | ErrorService = createAlbum(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    albums.push((result as SuccessService<AlbumBD>).data);
    return res.status(201).json(result);
}

export function putAlbumController(req: Request, res: Response): Response {
    const result: SuccessService<AlbumBD> | ErrorService = putAlbum(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as PutSuccessService<AlbumBD>).index;
    albums[index] = (result as PutSuccessService<AlbumBD>).data;


    return res.status(200).json(result);
}

export function deleteAlbumController(req: Request, res: Response): Response {

    const result: DeleteSuccessService | ErrorService = deleteAlbum(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index;
    albums.splice(index, 1);

    return res.status(204).json({ message: `Elbum delated` });
}