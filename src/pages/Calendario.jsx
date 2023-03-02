import React, { useEffect, useState } from 'react'
// componentes
import ImagenPublicitaria from '../components/ImagenPublicitaria'
import GenericButton from '../components/GenericButton'
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

const selectCopaJornada = [
    { value: '1' ,text: 'fecha 1' },
    { value: '2' ,text: 'fecha 2' },
    { value: 'cuartos' ,text: 'cuartos' },
    { value: 'semi' ,text: 'semi' },
    { value: 'final' ,text: 'final' },
]

// assets
import diaPartido from '../assets/diaPartido.svg'
import horaPartido from '../assets/horaPartido.svg'

const Calendario = () => {

    const [allPartidos, setAllPartidos] = useState(PARTIDOS)
    const [ partidosFiltrados, setPartidosFiltrados ] = useState(allPartidos.filter(partidos => partidos.division === 'copa gchu' && partidos.categoria === 'grupo a' && partidos.jornada === 1))
    const [ division, setDivision ] = useState('copa gchu') // estado inicial que van a ser cambiados por los select
    const [ categoria, setCategoria ] = useState('grupo a') // estado inicial que van a ser cambiados por los select
    const [ jornada, setJornada ] = useState('1') // estado inicial que van a ser cambiados por los select
    const [selectsOptions, setSelectsOptions] = useState(selectCopa)
    const [selectsOptionsJornada, setSelectsOptionsJornada] = useState(selectCopaJornada)

    useEffect(() => {
        setPartidosFiltrados(allPartidos.filter(partidos => partidos.division === division && partidos.categoria === categoria && partidos.jornada === jornada))

    }, [division, categoria, jornada] )

    useEffect(() => {
        const isCopaGchu = division === 'copa gchu' ? selectCopa : selectDivision;
        setSelectsOptions(isCopaGchu)

        if( division === 'a' && categoria.startsWith('grupo') ){
            setCategoria('primera')
        }
        if( division === 'b' && categoria.startsWith('grupo') ){
            setCategoria('primera')
        }
        if( division === 'copa gchu' && !categoria.startsWith('grupo') ){
            setCategoria('grupo a')
        }

        const isCopaGchuJornada = division === 'copa gchu' ? selectCopaJornada : [{value: '1', text: 'fecha 1'}]
        setSelectsOptionsJornada(isCopaGchuJornada)

        if( division === 'a' && jornada.startsWith('cuartos') ){
            setJornada('1')
        }
        if( division === 'b' && jornada.startsWith('cuartos') ){
            setJornada('1')
        }

        if(jornada === 'cuartos') { 
            setCategoria('cuartos') 
            console.log(categoria)
        }
        console.log(division)
        console.log(categoria)
        console.log(jornada)
    }, [division, jornada, categoria])

    const changeSelectDivision = (event) => {
        const value = event.target.value;
        setDivision(value)
    } 
    const changeSelectCategoria = (event) => {
        const value = event.target.value;
        setCategoria(value)
    } 

    const changeSelectJornada = (event) => {
        const value = event.target.value;
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
                        { selectsOptions.map(item => <option key={item.value} value={item.value} > {item.text} </option>) }
                    </select>
                    <select value={jornada} name="jornada" onChange={changeSelectJornada}>
                        {/* <option value='1'>fecha 1</option>
                        <option value='2'>fecha 2</option>
                        <option value='3'>fecha 3</option> */}
                        { selectsOptionsJornada.map(item => <option key={item.value} value={item.value}> {item.text} </option> ) }
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
                                        <>
                                        <tr key={item.id}>
                                            <td className='td-nombreEquipo' >
                                                <span className='td-escudoEquipo'><img src={item.local.escudo_equipo} alt={`escudo del equipo de futbol ${item.local.nombre_equipo}`} /></span>
                                                <span className='td-nombreEquipoLargo'> {item.local.nombre_equipo} </span>
                                                <span className='td-nombreEquipoCorto'> {item.local.nombre_equipo_short} </span>
                                            </td>
                                            <td> { item.golLocal || item.golLocal === 0 ? item.golLocal : 
                                                <div className='td-diaPartido'> 
                                                    <img src={diaPartido} alt="fecha del partido de futbol" />
                                                    <span>{item.dia}</span> 
                                                </div> 
                                                } 
                                            </td>
                                            <td> { item.golVisitante || item.golVisitante === 0 ? item.golVisitante : 
                                                <div className='td-horaPartido'> 
                                                    <img src={horaPartido} alt="hora del partido de futbol" /> 
                                                    <span>{item.hora}</span> 
                                                </div>  
                                                } 
                                            </td>
                                            <td className='td-nombreEquipo'>
                                                <span className='td-nombreEquipoLargo'> {item.visitante.nombre_equipo} </span>
                                                <span className='td-nombreEquipoCorto'> {item.visitante.nombre_equipo_short} </span>
                                                <span className='td-escudoEquipo' >
                                                    <img src={item.visitante.escudo_equipo} alt={`escudo del equipo de futbol ${item.visitante.nombre_equipo}`} />
                                                </span>
                                            </td>
                                            { !item.golLocal && !item.golVisitante ? null :
                                                <div className='goleadores-container'>
                                                    <div className='goleadores-locales'> {item.goleadoresLocales && item.goleadoresLocales.split(',').map(gol => <span> {gol} </span> )} </div>
                                                    <div className='goleadores-visitantes'> {item.goleadoresVisitantes && item.goleadoresVisitantes.split(',').map(gol => <span> {gol} </span> )} </div>
                                                </div> 
                                            }
                                        </tr>
                                        
                                        {/* <tr key={item.id}>
                                            <td className='td-nombreEquipo' >
                                                <span className='td-escudoEquipo'><img src={item.local.escudo_equipo} alt={`escudo del equipo de futbol ${item.local.nombre_equipo}`} /></span>
                                                <span className='td-nombreEquipoLargo'> {item.local.nombre_equipo} </span>
                                                <span className='td-nombreEquipoCorto'> {item.local.nombre_equipo_short} </span>
                                                {item.goleadoresLocales && <div className='goleadores-locales-container'>{ item?.goleadoresLocales?.split(',').map(gol => <span> {gol} </span> ) }</div>}
                                            </td>
                                            <td> { item.golLocal || item.golLocal === 0 ? item.golLocal : item.dia } </td>
                                            <td> { item.golVisitante || item.golVisitante === 0 ? item.golVisitante : item.hora } </td>
                                            <td className='td-nombreEquipo'>
                                                <span className='td-nombreEquipoLargo'> {item.visitante.nombre_equipo} </span>
                                                <span className='td-nombreEquipoCorto'> {item.visitante.nombre_equipo_short} </span>
                                                <span className='td-escudoEquipo' ><img src={item.visitante.escudo_equipo} alt={`escudo del equipo de futbol ${item.visitante.nombre_equipo}`} /></span>
                                                { item.goleadoresVisitantes && <div className='goleadores-visitantes-container'>{ item?.goleadoresVisitantes?.split(',').map(gol => <span> {gol} </span> ) }</div>}
                                            </td>
                                        </tr> */}
                                        </>
                                        
                                        
                                    )
                                })}
                    </tbody>
                </table>

                <div className='genericButton-container'>
                    <GenericButton to='/posiciones'>ver posiciones</GenericButton>
                </div>
                
            </section>
        </main>
    )
}

export default Calendario