import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";
import { Response, Request } from "express";
import { createAlbumTrack, deleteAlbumTrack, getAllAlbumTracks } from "../serveis/albumTracksServeis";
import { AlbumTrackBD } from "../interfaces/albumTracks/albumTracksBD";
import { albumTracks } from "../data/albumTracks/data.albumTracks";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { createPlaylistTrack, deletePlaylistTrack, getAllPlaylistTracks } from "../serveis/playlistTracksServeis";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { playlistTracks } from "../data/playlistTracks/data.playlistTracks";
import { PlaylistTrackBD } from "../interfaces/playlistTracks/playlistTracksBD";

export function getAllPlaylistTracksController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllPlaylistTracks())
}


export function postPlaylistTrackController(req: Request, res: Response): Response {
    const result: SuccessService<PlaylistTrackBD> | ErrorService = createPlaylistTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    playlistTracks.push((result as SuccessService<PlaylistTrackBD>).data);

    return res.status(201).json(result);
}

export function deletePlaylistTrackController(req: Request, res: Response): Response {


    const result: DeleteSuccessService | ErrorService = deletePlaylistTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index;
    playlistTracks.splice(index, 1);

    return res.status(204).json({ message: `Plailit Truck delated` });
}