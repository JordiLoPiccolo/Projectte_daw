import type { PlaylistCardProps } from "./Types/PlaylistCardProps";

const PlaylistCard = ({ playlists }: PlaylistCardProps) => {
    return (
        <table id="playlist">
            <h2>Playlists</h2>
            {playlists.map((playlist) => (
                <div>
                    <tr>
                        <td><h3>{playlist.title}</h3></td>
                        <td> || </td>
                    <td><b>Usuari</b>: {playlist.user_id}</td>
                    </tr>
              </div>
            ))}
        </table>
    );
};

export default PlaylistCard;