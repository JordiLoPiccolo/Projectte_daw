import './App.css'
import { day, month, year } from './Components/data';
import { ObtenirReproduccions } from './Components/reproduccions';
import SongCard from './Components/Songs/SongCard'
import type { TrackView } from './Components/Songs/Types/TrackView';
import { tracks } from './Data/track/track';
import type { Track } from './Model/Track';

function App() {


  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const track: Track = tracks[random];

  const totalReproduccions: number = ObtenirReproduccions(track);

  const trackX: TrackView = {
    ...track,
    reproduccions: totalReproduccions
  }

  return (
    <>
      <header>
        Data:{day}-{month}-{year};
      </header>
      <SongCard trackInfo={trackX} />
    </>
  )
}

export default App
