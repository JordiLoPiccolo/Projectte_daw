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

    if (history.user === null || history.track === null ) {
        return false
    }


    return true;

}