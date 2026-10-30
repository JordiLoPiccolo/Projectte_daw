import type { TrackView } from "./TrackView";

export interface SongCardProps {
    trackInfo: TrackView;
    play: (inc: number) => void;
    like: () => void;
    reset: () => void;
}