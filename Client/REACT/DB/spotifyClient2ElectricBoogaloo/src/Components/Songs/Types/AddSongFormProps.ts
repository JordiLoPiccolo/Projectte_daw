import type { TrackCreate } from "../../../APIManagement/Tracks/Interfaces/TrackCreate";

export interface AddSongFormProps{

    submit: (t: TrackCreate) => void;
}