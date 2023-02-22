import React from 'react'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// paginas
const LazyCalendario = React.lazy( () => import('./pages/Calendario')  )
const LazyContacto = React.lazy( () => import('./pages/Contacto')  )
const LazyHome = React.lazy( () => import('./pages/Home')  )
const LazyPosiciones = React.lazy( () => import('./pages/Posiciones')  )
const LazyNotFound = React.lazy( () => import('./pages/NotFound')  )
// componentes
import Footer from './components/Footer'
import Header from './components/Header'
import Loading from './components/Loading'
// funciones
import { match } from './utils/functions/match'
import { getData } from './utils/functions/getData'
// constantes
import { URL_API } from './utils/constantes/url'

function App() {
  // partidos
  const [allPartidos, setAllPartidos] = useState([])

  useEffect(() => {
    const URL = URL_API;
    const endpoint = '/partidos';
    getData(URL, endpoint).then(setAllPartidos)
  }, [] )

  allPartidos && allPartidos?.map(partido => 
    {
      match(
        partido.jornada,
        partido.division,
        partido.categoria,
        partido.dia,
        partido.hora,
        partido.equipoLocal,
        parseInt(partido.golLocal),
        partido.equipoVisitante,
        parseInt(partido.golVisitante),
        partido.goleadoresLocales,
        partido.goleadoresVisitantes,
      )
    })

  return (
    <>
      <Header />

      <Routes>

        < Route 
          path='/' 
          element={ 
            <React.Suspense fallback={ < Loading /> }>
              < LazyHome  />  
            </React.Suspense>
            }
        />
        < Route 
          path='/posiciones' 
          element={ 
            <React.Suspense fallback={ < Loading /> }>
              < LazyPosiciones  />  
            </React.Suspense>
            }
        />
        < Route 
          path='/calendario' 
          element={ 
            <React.Suspense fallback={ < Loading /> }>
              < LazyCalendario  />  
            </React.Suspense>
            }
        />
        < Route 
          path='/contacto' 
          element={ 
            <React.Suspense fallback={ < Loading /> }>
              < LazyContacto  />  
            </React.Suspense>
            }
        />
        < Route 
          path='*' 
          element={ 
            <React.Suspense fallback={ < Loading /> }>
              < LazyNotFound  />  
            </React.Suspense>
            }
        />
      </Routes>

      < Footer />
    </>
  )
}

export default App