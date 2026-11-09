import type { PlaylistCardProps } from "./Types/PlaylistCardProps";

const PlaylistCard = ({ playlists }: PlaylistCardProps) => {
    return (
        <section>
            <h2>Playlists</h2>
            {playlists.map((playlist) => (
                <article key={playlist.id}>
                    <h3>{playlist.title}</h3>
                    <p>Usuari: {playlist.user_id}</p>
                </article>
            ))}
        </section>
    );
};

export default PlaylistCard;