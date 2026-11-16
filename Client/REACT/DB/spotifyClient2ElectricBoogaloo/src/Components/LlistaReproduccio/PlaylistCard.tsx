import { useState } from "react";
import type { GETPlaylistTracks } from "../../APIManagement/PlaylistTrack/Interface/PlaylistTrack";
import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import type { PlaylistCardProps } from "./Types/PlaylistCardProps";

const PlaylistCard = ({ playlists, playlistTracks, tracks, onPlay }: PlaylistCardProps) => {
    const [expandedPlaylists, setExpandedPlaylists] = useState<Set<string>>(() => new Set());

    function togglePlaylist(playlistId: string) {
        setExpandedPlaylists((current) => {
            const next = new Set(current);
            if (next.has(playlistId)) {
                next.delete(playlistId);
            } else {
                next.add(playlistId);
            }
            return next;
        });
    }

    return (
        <section id="playlist">
            <h2>Playlists</h2>
            {playlists.map((playlist) => {
                const playlistSongs = playlistTracks
                    .filter((playlistTrack) => playlistTrack.playlist_id === playlist.id) 
                    .map((playlistTrack) => ({
                        playlistTrack,
                        track: tracks.find((track) => track.id === playlistTrack.track_id),
                    }))
                    .filter((item): item is { playlistTrack: GETPlaylistTracks; track: GETTrack } => item.track !== undefined);
                const isExpanded = expandedPlaylists.has(playlist.id);

                return (
                   
                    < article key = { playlist.id } >
                        <h3>{playlist.title}</h3>
                        <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={`playlist-songs-${playlist.id}`}
                            onClick={() => togglePlaylist(playlist.id)}
                        >
                            {isExpanded ? "Amaga cançons" : "Mostra cançons"}
                        </button>
                        {isExpanded && (
                            <ul id={`playlist-songs-${playlist.id}`}>
                                {playlistSongs.length > 0
                                    ? playlistSongs.map(({ playlistTrack, track }) => (
                                        <li key={playlistTrack.id}>
                                            <span>{track.title} — {track.artist}</span>
                                            <button type="button" onClick={() => onPlay(track)}>Play</button>
                                        </li>
                                    ))
                                    : <li>Aquesta playlist encara no té cançons.</li>}
                            </ul>
                        )}
                    </article>
                );
            })}
        </section>
    );
};

export default PlaylistCard;