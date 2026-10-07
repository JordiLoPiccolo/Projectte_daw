import { randomUUID } from "crypto";
import { tracks } from "../data/track/track";
import { Track } from "../interfaces/track/track";
import { TrackBD } from "../interfaces/track/trackBD";
import { isValidTrack } from "../validators/trackValidator";
import { ErrorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/successService";

export function getAllTracks(): TrackBD[] {
    return tracks;
}

export function getTrackById(idTrack: string): TrackBD | undefined {

    return tracks.find(
        (t: TrackBD) => { return t.id === idTrack }
    );

}

export function createTrack(track: Track): SuccessService<TrackBD> | ErrorService {



    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist,
        duration: track.duration
    };
    tracks.push(trackRecord);

    return {success: true, data: trackRecord,code:201};


}

export function putTrack(track: TrackBD): SuccessService<TrackBD> | ErrorService{
    if (!isValidTrack(track)) {
        return { success: false, code:400, message: "fuck you" };
    }

    const idTrack: string = track.id as string;
    const index: number = tracks.findIndex(
        (t: TrackBD) => { return t.id === idTrack }
    );

    if (index === -1) {
        return {success:false, code:404, message: `Track ${idTrack} not found lol` };
    }

    tracks[index] = {
        id: idTrack,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist,
        duration: track.duration
    };

    return { success: true, data: tracks[index], code: 201 };
}