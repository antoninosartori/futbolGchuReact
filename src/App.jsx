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
import { getData } from './utils/functions/getData'
import NotFound from './pages/NotFound'
import { URL_API } from './utils/constantes/url'

function App() {
  const [allPartidos, setAllPartidos] = useState([])

  useEffect(() => {
    const URL = URL_API;
    const endpoint = '/partidos';
    getData(URL, endpoint).then(setAllPartidos)
  }, [] )

  allPartidos && allPartidos?.map(partido => {
    match(
      partido.jornada,
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
        < Route path='*' element={   < NotFound /> } />

      </Routes>

      < Footer />
    </>
  )
}

export default App