import { users } from "../data/user/users";
import { Playlist } from "../interfaces/playlist/playlist";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";
import { UserBD } from "../interfaces/user/userBD";


export function isValidPlaylist(PList: Playlist):boolean {
    if (!PList) {
        return false;
    }

    if (PList.title === null || PList.user === null ) {
        return false
    }

    

    const longArtistName: number = PList.title.trim().replace(/\s+/g, " ").length;
    const longRealName: number = PList.user.trim().replace(/\s+/g, " ").length;

    const dadesOK: boolean = longArtistName > 0 && longArtistName <= maxArtist
        && longRealName > 0 && longRealName <= maxTitol;
    
    if (!dadesOK) {
        return false;
    }
    
    const UserOK: UserBD | undefined = users.find(
        (c: UserBD) => { return c.id === PList.user }
    );

    if (!UserOK) return false;
    
    return true;

}
