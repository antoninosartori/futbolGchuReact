import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Calendario from './pages/Calendario'
/* import Contacto from './pages/Contacto' */
import Home from './pages/Home'
import Posiciones from './pages/Posiciones'

// funciones
import { match } from './utils/functions/match'

function App() {
  const [allPartidos, setAllPartidos] = useState([])

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/yfbfn065or6yn?sheet=partidos')
    .then((response) => response.json())
    .then((data) => setAllPartidos(data));
  }, [] )

  allPartidos && allPartidos?.map(partido => {
    match(
      parseInt(partido.jornada),
      partido.division,
      partido.categoria,
      partido.dia,
      partido.hora,
      partido.equipoLocal,
      parseInt(partido.golLocal),
      partido.equipoVisitante,
      parseInt(partido.golVisitante))
  })

  return (
    <>
      <Header/>

      <Routes>

        < Route path='/' element={   < Home lastPartidos={allPartidos} /> } />
        < Route path='/posiciones' element={   < Posiciones /> } />
        < Route path='/calendario' element={   < Calendario /> } />
        {/* < Route path='/contacto' element={   < Contacto /> } /> */}

      </Routes>

    </>
  )
}

export default App