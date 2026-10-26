import { useState } from 'react';
import './App.css'
import { day, hour, minute, month, second, year } from './Components/data';
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

  const track: Track = RandomTrack();
  let [ElTrack, setTrack] = useState<Track>(track);

  function handleRandom() {
    let randomTrack: Track = RandomTrack();
    setTrack(randomTrack);
  }
  const totalReproduccions: number = ObtenirReproduccions(ElTrack);

  const trackX: TrackView = {
    ...ElTrack,
    reproduccions: totalReproduccions
  }

  return (
    <>
      <header>
        Data:{day}-{month}-{year}  {hour}:{minute}:{second} ||
        User: {randomUser()}
      </header>
      <p><button onClick={() => handleRandom()}>Random</button></p>
      <SongCard trackInfo={trackX} />

    </>
  )
}


export default App
