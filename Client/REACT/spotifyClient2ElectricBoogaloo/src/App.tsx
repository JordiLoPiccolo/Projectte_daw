import { useState } from 'react';
import './App.css'
import SongCard from './Components/Songs/SongCard'
import type { TrackView } from './Components/Songs/Types/TrackView';
import { tracks } from './Data/track/track';
import { randomUser } from './Components/users';
import type { Like } from './Model/Like';




function App() {
 
  const [user] = useState(() => randomUser());

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
          like: true,
          totalLikes: 180
        },
        "reproduccions": Math.floor(Math.random() * 200)
      };
    setTrack(randomTrack);
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
      <SongCard trackInfo={track} play={ (inc:number) => incrementReproduction(inc) } like={() => gestionarLikes()} />

    </>
  )
}


export default App
