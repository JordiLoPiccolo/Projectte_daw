import type { Track } from "../../../Model/Track";

export interface SongRowProps {
    id: string;
    title: string;
    artist: string;
    duration: number;
    onPlay: () => void;
    edit: (t: Track) => void;
}