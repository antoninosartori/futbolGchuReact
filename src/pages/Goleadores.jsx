import React, { useEffect, useState } from 'react'
import './Posiciones.css'
// constntes
import { GOLEADORES } from '../utils/constantes/goleadores'
// componentes
import Title from '../components/Title'
// assets
const THEAD = 
[
    {name: 'nombre'},
    {name: 'goles'}
]

const Goleadores = () => {
    window.scrollTo(0, 0);
    
    const [ division, setDivision ] = useState('copa gchu') // estado inicial que van a ser cambiados por los select
    const [ goleadoresFiltrados, setGoleadoresFiltrados ] = useState(GOLEADORES.filter(goleadores => goleadores.division === 'copa gchu').sort((a,b) => (b.gol - a.gol)))

    useEffect(() => {
        setGoleadoresFiltrados(GOLEADORES.filter(goleadores => goleadores.division === division).sort((a,b) => (b.gol - a.gol)))

    }, [division] )

    const changeSelectDivision = (event) => {
        const value = event.target.value;
        setDivision(value)
    } 

    return(
        <main>
            <section className='tabla-container goleadores-section-container'>
                <Title>goleadores</Title>

                <form action="">
                    <select value={division} name="division" onChange={changeSelectDivision}>
                        <option value="a">división a</option>
                        <option value="b">división b</option>
                        <option value="copa gchu">copa gchu</option>
                    </select>
                </form>

                <table>
                    <thead>
                        <tr>
                            {THEAD.map(header => <th colSpan={header.name === 'nombre' ? 2 : null}> {header.name} </th> )}
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(goleadoresFiltrados)}
                        {goleadoresFiltrados?.map((item, idx) => {
                                    return(
                                        <tr key={item.nombre}>
                                            <td className='goleador-nombre'> {item.nombre} </td>
                                            <td className='td-nombreEquipo'>
                                                <span className='td-escudoEquipo'><img src={item.escudo_equipo} alt={`escudo del equipo ${item.nombre_equipo}`} /></span>
                                                <span className='td-nombreEquipoLargo'> {item.nombre_equipo} </span>
                                                <span className='td-nombreEquipoCorto'> {item.nombre_equipo_short} </span>
                                            </td>
                                            <td className='goleador-goles'> {item.gol} </td>
                                        </tr>
                                    )
                                })}
                    </tbody>
                </table>

            </section>
        </main>
    )
}

export default Goleadores