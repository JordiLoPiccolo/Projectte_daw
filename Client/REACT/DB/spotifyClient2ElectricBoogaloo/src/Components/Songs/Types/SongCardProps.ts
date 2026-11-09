import type { TrackView } from "./TrackView";

export interface SongCardProps {
    trackInfo: TrackView;
    reproduint: boolean;
    play: (inc: number) => void;
    like: () => void;
    reset: () => void;
}