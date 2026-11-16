import { useEffect, useState } from 'react';
import type { GETTrack } from '../../APIManagement/Tracks/Interfaces/Track';
import type { GETPlaylist } from '../../APIManagement/Playlists/Interface/Playlist';
import ReproCard from '../../Components/Reproductor/ReproCard';
import PlaylistCard from '../../Components/LlistaReproduccio/PlaylistCard';
import ListSongs from '../../Components/Songs/ListSongs';
import SongCard from '../../Components/Songs/SongCard';
import type { TrackView } from '../../Components/Songs/Types/TrackView';
import { ENV } from '../../Config/env';
import type { Like } from '../../Model/Like';
import type { reproductor } from '../../Model/Reproductor';
import type { GETPlaylistTracks } from '../../APIManagement/PlaylistTrack/Interface/PlaylistTrack';
import { getIncrementReproduction } from './getIncrementReproduction';


const Play = () => {
    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [playlists, setPlaylist] = useState<GETPlaylist[]>([]);
    const [playlistTracks, setPlaylistTracks] = useState<GETPlaylistTracks[]>([]);
    const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);

    const [cancoReproduint, setReproduccio] = useState<reproductor>(
        {
            titol: "",
            reproduint: false
        }
    );
    const [track, setTrack] = useState<TrackView>(
        {
            ...tracks[Math.floor(Math.random() * tracks.length)],
            reproduccions: Math.floor(Math.random() * 20000),
            likes: {
                like: false,
                totalLikes: 0
            },
        });


    async function carregarDadesTrack() {

        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
        setTracks(listTrack);
    }

    async function carregarDadesPlaylist() {

        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/playlists`);
        const listPlaylist: GETPlaylist[] = await resposta.json() as GETPlaylist[];
        setPlaylist(listPlaylist);
    }

    async function carregarDadesPlaylistTracks() {

        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/playlistTracks`);
        const listPlaylistTracks: GETPlaylistTracks[] = await resposta.json() as GETPlaylistTracks[];
        setPlaylistTracks(listPlaylistTracks);
    }

    useEffect(
        () => {
            carregarDadesTrack();
            carregarDadesPlaylist();
            carregarDadesPlaylistTracks();
        }, []
    );

    //IMPORTANT: select sum(like) from dbo.Likes where track_id="....";


    async function incrementReproduction(inc: number, selectedTrack?: GETTrack) {
        const trackToPlay = selectedTrack ?? tracks.find((currentTrack) => currentTrack.id === currentTrackId);

        if (selectedTrack) {
            setCurrentTrackId(selectedTrack.id);
            setTrack({
                ...selectedTrack,
                reproduccions: inc,
                likes: { like: false, totalLikes: 0 },
            });
        } else {
            setTrack((previousTrack: TrackView) => ({
                ...previousTrack,
                reproduccions: previousTrack.reproduccions + inc,
            }));
        }

        if (trackToPlay) {
            setReproduccio({ titol: trackToPlay.title, reproduint: true });
        }

        const trackId = trackToPlay?.id ?? currentTrackId;
        if (!trackId) return;
        const historyAdded = await getIncrementReproduction(trackId);
        if (!historyAdded) {
            return false;
        }

    }

    function aturarReproduccio() {
        setReproduccio({
            titol: "no s'està reproduint cap canco",
            reproduint: false
        });
    }

    function gestionarLikes() {
        const tr = (prev: TrackView): TrackView => {
            let increment: number = 1;
            if (prev.likes.like) {
                increment = -1;
            }
            const likeObj: Like = {
                like: !prev.likes.like,
                totalLikes: prev.likes.totalLikes + increment
            }


            return {
                ...prev,
                likes: likeObj
            };
        }
        setTrack(tr);
    }

    function handleRandom() {
        if (tracks.length === 0) return;

        const random: number = Math.floor(Math.random() * tracks.length)
        const randomTrack: TrackView = {
            ...tracks[random],
            likes: {
                like: false,
                totalLikes: 180
            },
            "reproduccions": Math.floor(Math.random() * 200)
        };
        setTrack(randomTrack);
        setCurrentTrackId(tracks[random].id);
    }

    function gestionarReset() {
        const tr = (prev: TrackView): TrackView => {
            return {
                ...prev,
                likes: {
                    like: false,
                    totalLikes: 0
                },
                "reproduccions": 0
            }
        }
        setTrack(tr);
    }

    function handleVolum(pujabaixa: number) {
        let volum: number;
        volum = + pujabaixa;
        return volum
    }

    

   




    return (
        <>

           
            <p><button onClick={() => handleRandom()}>Random</button></p>
            <main>
                {
                    tracks.length > 0 ?
                        <table>
                            <thead>
                                <title>List Songs</title>
                            </thead>
                            <tbody>
                                <ListSongs tracks={tracks} onPlay={(selectedTrack) => incrementReproduction(1, selectedTrack)} setTrack={setTrack} />
                            </tbody>
                        </table>
                        : <></>
                }
                <PlaylistCard
                    playlists={playlists}
                    playlistTracks={playlistTracks}
                    tracks={tracks}
                    onPlay={(selectedTrack) => incrementReproduction(1, selectedTrack)}
                />

                <aside>
                    <SongCard trackInfo={track} reproduint={cancoReproduint.reproduint} play={(inc: number) => incrementReproduction(inc)} like={() => gestionarLikes()} reset={() => gestionarReset()} />
                </aside>

            </main>
            <ReproCard reproductor={cancoReproduint} controlVolum={(pujabaixa: number) => handleVolum(pujabaixa)} stop={aturarReproduccio} />
        </>
    )
}

export default Play;