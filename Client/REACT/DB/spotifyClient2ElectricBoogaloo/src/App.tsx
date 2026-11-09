import { useEffect, useState } from 'react';
import './App.css'
import SongCard from './Components/Songs/SongCard'
import type { TrackView } from './Components/Songs/Types/TrackView';
import { randomUser } from './Components/users';
import type { Like } from './Model/Like';
import ReproCard from './Components/Reproductor/ReproCard';
import type { reproductor } from './Model/Reproductor';
import ListSongs from './Components/Songs/ListSongs';
import { ENV } from './Config/env';
import type { GETTrack } from './APIManagement/Tracks/Interfaces/Track';
import type { AddHistory } from './APIManagement/History/Interfaces/HistoryCreate';
import type { GETPlaylist } from './APIManagement/Playlists/Interface/Playlist';
import PlaylistCard from './Components/LlistaReproduccio/PlaylistCard';




function App() {

  const [tracks, setTracks] = useState<GETTrack[]>([]);
  const [playlists, setPlaylist] = useState<GETPlaylist[]>([]);

  const [user] = useState(() => randomUser());
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
 
    const resposta:Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
    const listTrack: GETTrack[] = await resposta.json() as GETTrack[];  
    setTracks(listTrack);
  }

  async function carregarDadesPlaylist() {

    const resposta: Response = await fetch(`${ENV.API_BASE_URL}/playlists`);
    const listPlaylist: GETPlaylist[] = await resposta.json() as GETPlaylist[];
    setPlaylist(listPlaylist);
  }
    
  useEffect(
    () => {
      carregarDadesTrack();
      carregarDadesPlaylist();
    }, []
  );

//IMPORTANT: select sum(like) from dbo.Likes where track_id="....";

  async function incrementReproduction(inc: number) {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        "reproduccions": + prev.reproduccions + inc
      }
    }

    setReproduccio((reproductorActual) => {
      if (reproductorActual.reproduint) {
        return { titol: "", reproduint: false };
      }

      return { titol: track.title, reproduint: true };
    });
    
    setTrack(tr);
    
    const newHistory: AddHistory = {
      user: "921C4AA8-930B-4A10-91D0-CB3BCD3B12C4",
      track: tracks[0].id
    };

    const response: Response = await fetch(
      "http://localhost:3000/tracks/user/history",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newHistory)
      }

    
    );
    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    console.log(result)
    
    
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

  const [date, setDate] = useState(() => new Date());

  function updateDate() {
    setDate(new Date());
  }


  

  return (
    <>
      


      <header>
        <h1>Spotify Miquel</h1>
        Data:{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}  {date.getHours()}:{date.getMinutes()}:{date.getSeconds()} ||
        User: {user}
        <p><button onClick={() => updateDate()}>Update data</button></p>
      </header>

      <p><button onClick={() => handleRandom()}>Random</button></p>
      <main>
        {
          tracks.length > 0 ?
            <table>
              <thead>
                <title>List Songs</title>
              </thead>
              <tbody>
                <ListSongs tracks={tracks} onPlay={() => incrementReproduction(1)} setTrack={setTrack} />
              </tbody>
            </table>
            :<></>
        }
        <PlaylistCard playlists={playlists} />
        
        <aside>
          <SongCard trackInfo={track} reproduint={cancoReproduint.reproduint} play={(inc: number) => incrementReproduction(inc)} like={() => gestionarLikes()} reset={() => gestionarReset()}/>
        </aside>
        
      </main>
      <ReproCard reproductor={cancoReproduint} controlVolum={(pujabaixa: number) => handleVolum(pujabaixa)} stop={aturarReproduccio} />
    </>
  )
}


export default App
