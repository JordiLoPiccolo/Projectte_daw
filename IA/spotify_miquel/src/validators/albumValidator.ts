import { Album } from "../interfaces/album/album";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";


export function isValidAlbum(album: Album):boolean {
    if (!album) {
        return false;
    }

    if (album.artist === null || album.title === null || album.data === null) {
        return false
    }
    const longArtistName: number = album.artist.trim().replace(/\s+/g, " ").length;
    const longTitleName: number = album.title.trim().replace(/\s+/g, " ").length;

    return longArtistName > 0 && longArtistName <= maxArtist
        && longTitleName > 0 && longTitleName <= maxTitol
}
