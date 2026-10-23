import { useState } from 'react';
import './App.css'
import { day, month, year } from './Components/data';
import { ObtenirReproduccions } from './Components/reproduccions';
import SongCard from './Components/Songs/SongCard'
import type { TrackView } from './Components/Songs/Types/TrackView';
import { tracks } from './Data/track/track';
import type { Track } from './Model/Track';

function App() {

  function RandomTrack() {
    const totalTracks: number = tracks.length;
    const random: number = Math.floor(Math.random() * totalTracks);
    const track: Track = tracks[random];
    setTrack(track);
    return track;
  }
  
  const track: Track = RandomTrack();
  let [ElTrack, setTrack] = useState<Track>(track);

  const totalReproduccions: number = ObtenirReproduccions(ElTrack);

  const trackX: TrackView = {
    ...ElTrack,
    reproduccions: totalReproduccions
  }

  return (
    <>
      <header>
        Data:{day}-{month}-{year};
      </header>
      <p><button onClick={() => RandomTrack()}>Random</button></p>
      <SongCard trackInfo={trackX} />
     
    </>
  )
}


export default App
