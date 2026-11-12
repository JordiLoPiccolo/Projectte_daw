import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { Response, Request } from "express";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { createPlaylistTrack, deletePlaylistTrack, getAllPlaylistTracks } from "../serveis/playlistTracksServeis";
import { PlaylistTrackBD } from "../interfaces/playlistTracks/playlistTracksBD";

export async function getAllPlaylistTracksController(_req: Request, res: Response): Promise<Response> {
    const playlistTracksBD: PlaylistTrackBD[] = await getAllPlaylistTracks();
    return res.status(200).json(playlistTracksBD);
}


export async function postPlaylistTrackController(req: Request, res: Response): Promise<Response> {
    const result: SuccessService | ErrorService = await createPlaylistTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    return res.status(201).json(result);
}

export async function deletePlaylistTrackController(req: Request, res: Response): Promise<Response> {
    const result: DeleteSuccessService | ErrorService = await deletePlaylistTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    return res.status(204).send();
}