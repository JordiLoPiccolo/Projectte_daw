import { useState } from 'react';
import './App.css'
import { ObtenirReproduccions } from './Components/reproduccions';
import SongCard from './Components/Songs/SongCard'
import type { TrackView } from './Components/Songs/Types/TrackView';
import { tracks } from './Data/track/track';
import type { Track } from './Model/Track';
import { randomUser } from './Components/users';




function App() {
  function RandomTrack() {
    const totalTracks: number = tracks.length;
    const random: number = Math.floor(Math.random() * totalTracks);
    const track: Track = tracks[random];
    return track;
  }
  const [user] = useState(() => randomUser());

  const [track, setTrack] = useState<TrackView>(
    {
      ...tracks[Math.floor(Math.random() * tracks.length)],
      reproduccions: Math.floor(Math.random() * 20000),
      likes: Math.floor(Math.random() * 300)
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

  function handleRandom() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...tracks[Math.floor(Math.random() * tracks.length)],
        "reproduccions": Math.floor(Math.random() * 20000),
        likes: Math.floor(Math.random() * 300)
      }
    }
    setTrack(tr);
  }
  const totalReproduccions: number = ObtenirReproduccions(track);

  
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
      <SongCard trackInfo={track} />

    </>
  )
}


export default App
