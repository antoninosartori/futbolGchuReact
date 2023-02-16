import React, { useEffect, useState } from 'react'
// componentes
import ImagenPublicitaria from '../components/ImagenPublicitaria'
import Title from '../components/Title'
import { PARTIDOS } from '../utils/constantes/partidos'
// constantes
const THEAD = 
[
    {name: 'local'},
    {name: 'goles'},
    {name: 'visitante'}
]
const selectDivision = [{value: 'primera', text: 'primera'}, {value: 'sub', text: 'sub 23'}, ]
const selectCopa = [
    {value: 'grupo a', text: 'grupo a'},
    {value: 'grupo b', text: 'grupo b'}, 
    {value: 'grupo c', text: 'grupo c'}, 
    {value: 'grupo d', text: 'grupo d'}, 
    {value: 'grupo e', text: 'grupo e'}, 
    {value: 'grupo f', text: 'grupo f'}
]

const Calendario = () => {

    const [allPartidos, setAllPartidos] = useState(PARTIDOS)
    const [ partidosFiltrados, setPartidosFiltrados ] = useState(allPartidos.filter(partidos => partidos.division === 'copa gchu' && partidos.categoria === 'grupo a' && partidos.jornada === 1))
    const [ division, setDivision ] = useState('copa gchu') // estado inicial que van a ser cambiados por los select
    const [ categoria, setCategoria ] = useState('grupo a') // estado inicial que van a ser cambiados por los select
    const [ jornada, setJornada ] = useState(1) // estado inicial que van a ser cambiados por los select
    const [selectsOptions, setSelectsOptions] = useState(selectCopa)

    useEffect(() => {
        setPartidosFiltrados(allPartidos.filter(partidos => partidos.division === division && partidos.categoria === categoria && partidos.jornada === jornada))

    }, [division, categoria, jornada] )

    useEffect(() => {
        setSelectsOptions(division === 'copa gchu' ? selectCopa : selectDivision)
    }, [division])

    const changeSelectDivision = (event) => {
        const value = event.target.value;
        setDivision(value)
    } 
    const changeSelectCategoria = (event) => {
        const value = event.target.value;
        setCategoria(value)
    } 

    const changeSelectJornada = (event) => {
        const value = parseInt(event.target.value);
        setJornada(value)
    }

    return(
        <main>
            <section className='tabla-container calendario-container'>
                <ImagenPublicitaria 
                    imgSrc='https://drive.google.com/uc?export=view&id=1LrjYPiQw1lLwyKPrGE_ERzI42pYxIpiM&rl'
                    alto='300px'
                    ancho='100%'
                    >
                </ImagenPublicitaria>

                <Title>Calendario</Title>

                <form action="">
                    <select value={division} name="division" onChange={changeSelectDivision}>
                        <option value="a">division a</option>
                        <option value="b">division b</option>
                        <option value="copa gchu">copa gchu</option>
                    </select>
                    <select value={categoria} name="categoria" onChange={changeSelectCategoria}>
                        {selectsOptions.map(item => {
                            return(
                                <option key={item.value} value={item.value} > {item.text} </option>
                                )
                        } ) }
                    </select>
                    <select value={jornada} name="jornada" onChange={changeSelectJornada}>
                        <option value='1'>fecha 1</option>
                        <option value='2'>fecha 2</option>
                        <option value='3'>fecha 3</option>
                    </select>
                </form>

                <table>
                    <thead>
                        <tr>
                            {THEAD.map(header => <th colSpan={header.name === 'goles' ? 2 : null}> {header.name} </th> )}
                        </tr>
                    </thead>
                    <tbody>
                        {partidosFiltrados?.map((item, idx) => {
                                    return(
                                        <tr key={item.id}>
                                            <td className='td-nombreEquipo' >
                                                <span className='td-escudoEquipo'><img src={item.local.escudo_equipo} alt="" /></span>
                                                <span className='td-nombreEquipoLargo'> {item.local.nombre_equipo} </span>
                                                <span className='td-nombreEquipoCorto'> {item.local.nombre_equipo_short} </span>
                                            </td>
                                            <td> {!item.golLocal ? item.dia : item.golLocal} </td>
                                            <td> {!item.golVisitante ? item.hora : item.golVisitante} </td>
                                            <td className='td-nombreEquipo'>
                                                <span className='td-nombreEquipoLargo'> {item.visitante.nombre_equipo} </span>
                                                <span className='td-nombreEquipoCorto'> {item.visitante.nombre_equipo_short} </span>
                                                <span className='td-escudoEquipo' ><img src={item.visitante.escudo_equipo} alt="" /></span>
                                            </td>
                                        </tr>
                                        
                                    )
                                })}
                    </tbody>
                </table>

            </section>
        </main>
    )
}

export default Calendario