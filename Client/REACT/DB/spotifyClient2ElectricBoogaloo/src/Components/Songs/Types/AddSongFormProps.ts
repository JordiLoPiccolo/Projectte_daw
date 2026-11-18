import type { TrackCreate } from "../../../APIManagement/Tracks/Interfaces/TrackCreate";

export interface AddSongFormProps{

    refreshSongs: () => void;
    submit: (t: TrackCreate) => void;
}