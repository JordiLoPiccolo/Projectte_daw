import { useState } from 'react';
import './App.css'
import SongCard from './Components/Songs/SongCard'
import type { TrackView } from './Components/Songs/Types/TrackView';
import { tracks } from './Data/track/track';
import { randomUser } from './Components/users';
import type { Like } from './Model/Like';
import ReproCard from './Components/Reproductor/ReproCard';
import type { reproductor } from './Model/Reproductor';




function App() {
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
  
  function incrementReproduction(inc: number) {
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

      return { titol: "canco reproduint", reproduint: true };
    });
   
    setTrack(tr);
  }

  function gestionarLikes() {
    const tr = (prev: TrackView): TrackView => {
      let increment: number = 1;
      if (prev.likes.like) {
        increment = -1;
      }
      const likeObj: Like = {
        like: !prev.likes.like,
        totalLikes:prev.likes.totalLikes + increment
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
      const randomTrack:TrackView = {
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

  function handleVolum(PujaBaixa: boolean) {
    let volum: number;
    if (PujaBaixa) {
      volum = + 1;
    } else {
      volum = - 1;
    }
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
      <SongCard trackInfo={track} play={ (inc:number) => incrementReproduction(inc) } like={() => gestionarLikes()} reset ={()=> gestionarReset()} />
      <ReproCard reproductor={cancoReproduint} controlVolum={(pujabaixa: boolean) => handleVolum(pujabaixa) }/>
    </>
  )
}


export default App
