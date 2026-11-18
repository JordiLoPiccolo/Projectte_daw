import type { Track } from "../../../Model/Track";

export type FormState = 
    { mode: "none"; } |
    { mode: "new"; } |
    {
        mode: "edit";
        song: Track;
    }

export type Formats = "mp3" | "mp4"; // amb sort mai farem aixo