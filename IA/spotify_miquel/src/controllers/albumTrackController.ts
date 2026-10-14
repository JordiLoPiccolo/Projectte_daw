import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { Response, Request } from "express";
import { createPlaylist, getAllPlaylists, getPlaylistById, putPlayList } from "../serveis/playlistServeis";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { playlists } from "../data/playlist/data.playlist";
import { createAlbumTrack, deleteAlbumTrack, getAllAlbumTracks } from "../serveis/albumTracksServeis";
import { AlbumTrackBD } from "../interfaces/albumTracks/albumTracksBD";
import { albumTracks } from "../data/albumTracks/data.albumTracks";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";

export function getAllAlbumTracksController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllAlbumTracks())
}


export function postAlbumTrackController(req: Request, res: Response): Response {
    const result: SuccessService<AlbumTrackBD> | ErrorService = createAlbumTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    albumTracks.push((result as SuccessService<AlbumTrackBD>).data);

    return res.status(201).json(result);
}

export function deleteAlbumTrackController(req: Request, res: Response): Response {


    const result: DeleteSuccessService | ErrorService = deleteAlbumTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index;
    albumTracks.splice(index, 1);

    return res.status(204).json({ message: `ElbumTruck delated` });
}