import { tracks } from "../data/track/track";
import { users } from "../data/user/users";
import { History } from "../interfaces/history/history";
import { TrackBD } from "../interfaces/track/trackBD";
import { maxArtist, maxTitol } from "../interfaces/track/trackConstants";
import { UserBD } from "../interfaces/user/userBD";


export function isValidHistory(history: History): boolean {
    if (!history) {
        return false;
    }

    if (history.user === null || history.track === null || history.data === null) {
        return false
    }



    const longArtistName: number = history.user.trim().replace(/\s+/g, " ").length;
    const longRealName: number = history.track.trim().replace(/\s+/g, " ").length;

    const dadesOK: boolean = longArtistName > 0 && longArtistName <= maxArtist
        && longRealName > 0 && longRealName <= maxTitol;

    if (!dadesOK) {
        return false;
    }

    const UserOK: UserBD | undefined = users.find(
        (c: UserBD) => { return c.id === history.user }
    );

    if (!UserOK) return false;

    const TrackOK: TrackBD | undefined = tracks.find(
        (c: TrackBD) => { return c.id === history.track }
    );

    if (!TrackOK) return false;

    return true;

}