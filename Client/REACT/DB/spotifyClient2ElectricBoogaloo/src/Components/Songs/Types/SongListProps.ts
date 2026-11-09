import type { TrackListView } from "./TrackListView";
import type { TrackView } from "./TrackView";

export interface SongListProps {
    tracks: TrackListView[];
    onPlay: (track: TrackListView) => void;
    setTrack: (track: TrackView) => void;
}