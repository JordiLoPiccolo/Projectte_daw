import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import Play from './Pages/Authenticated/Play';
import { useState } from 'react';
import { randomUser } from './Components/users';




function App() {


  const [user] = useState(() => randomUser());
  const [date, setDate] = useState(() => new Date());

  function updateDate() {
    setDate(new Date());
  }
  return (
    <BrowserRouter>
      <header>
        <h1>Spotify Miquel</h1>
        Data:{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}  {date.getHours()}:{date.getMinutes()}:{date.getSeconds()} ||
        User: {user}
        <p><button onClick={() => updateDate()}>Update data</button></p>
      </header>

      <Routes>
        <Route path="/Play" element={<Play />}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
