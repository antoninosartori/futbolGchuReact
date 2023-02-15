import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// paginas
import Calendario from './pages/Calendario'
import Contacto from './pages/Contacto'
import Home from './pages/Home'
import Posiciones from './pages/Posiciones'
// componentes
import Footer from './components/Footer'
import Header from './components/Header'
// funciones
import { match } from './utils/functions/match'

function App() {
  const [allPartidos, setAllPartidos] = useState([])

  useEffect(() => {
    fetch('https://api.steinhq.com/v1/storages/63ece6e7eced9b09e9beec58/partidos')
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

        < Route path='/' element={   < Home /> } />
        < Route path='/posiciones' element={   < Posiciones /> } />
        < Route path='/calendario' element={   < Calendario /> } />
        < Route path='/contacto' element={   < Contacto /> } />

      </Routes>

      < Footer />
    </>
  )
}

export default App