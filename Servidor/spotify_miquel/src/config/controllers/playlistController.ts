import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { Response,Request } from "express";
import { createPlaylist, getAllPlaylists, getPlaylistById, putPlayList } from "../serveis/playlistServeis";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { playlists } from "../data/playlist/data.playlist";

export function getAllPlaylistController(_req:Request,res: Response): Response {
    return res.status(200).json(getAllPlaylists())
}

export function getPlaylistByIdController(req: Request, res: Response): Response {

    const findPlaylist: PlaylistBD | undefined = getPlaylistById(req.params.id as string);

    if (!findPlaylist) {
        return res.status(404).json({ message: `Playlist ${findPlaylist} not found lol` });
    }
    return res.status(200).json(findPlaylist);
}

export function postPlaylistController(req: Request, res: Response): Response {
     const result: SuccessService<PlaylistBD> | ErrorService = createPlaylist(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
    
        playlists.push((result as SuccessService<PlaylistBD>).data);
    
        return res.status(201).json(result);
}

export function putPlaylistController(req: Request, res: Response): Response {
    const result: SuccessService<PlaylistBD> | ErrorService = putPlayList(req.body, req.params.id);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        const index: number = (result as PutSuccessService<PlaylistBD>).index;
        playlists[index] = (result as PutSuccessService<PlaylistBD>).data;
    
    
        return res.status(200).json(playlists[index]);
}

export function deletePlaylistController(req: Request, res: Response): Response {


    const result: SuccessService<PlaylistBD> | ErrorService = putPlayList(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as PutSuccessService<PlaylistBD>).index;

    playlists.splice(index, 1);

    return res.status(204).json({ message: `PlaLit delated` });
}