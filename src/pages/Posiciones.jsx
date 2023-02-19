import { useEffect, useState } from 'react'
import './Posiciones.css'
// componentes
import Title from '../components/Title'
import ImagenPublicitaria from '../components/ImagenPublicitaria';
import GenericButton from '../components/GenericButton';
// constantes
import { EQUIPOS } from '../utils/constantes/equipos'
const THEAD = [
    {name: 'pos'},
    {name: 'equipo'},
    {name: 'pts'},
    {name: 'pj'},
    {name: 'g'},
    {name: 'e'},
    {name: 'p'},
    {name: 'gf', className: 'th-goles'},
    {name: 'gc', className: 'th-goles'},
    {name: 'dif'}
];

const selectDivision = [{value: 'primera', text: 'primera'}, {value: 'sub', text: 'sub 23'}, ]
const selectCopa = [
    {value: 'grupo a', text: 'grupo a'},
    {value: 'grupo b', text: 'grupo b'}, 
    {value: 'grupo c', text: 'grupo c'}, 
    {value: 'grupo d', text: 'grupo d'}, 
    {value: 'grupo e', text: 'grupo e'}, 
    {value: 'grupo f', text: 'grupo f'}
]

const Posiciones = () => {
    const [posiciones, setPosiciones] = useState(EQUIPOS) // estado inicial antes de filtrarse
    const [posicionesFiltradas, setPosicionesFiltradas] = 
        useState(posiciones.filter(equipos => equipos.division === 'copa gchu' && equipos.categoria === 'grupo a')
            .sort((a,b) => (b.pts * 1000 + b.dif) - (a.pts * 1000 + a.dif))) // estado por el cual se va a filtrar y mostrar las posiciones
    const [ division, setDivision ] = useState('copa gchu') // estado inicial que van a ser cambiados por los select
    const [ categoria, setCategoria ] = useState('grupo a') // estado inicial que van a ser cambiados por los select
    const [selectsOptions, setSelectsOptions] = useState(selectCopa)

    // filtra a las posiciones
    useEffect(() => {
        setPosicionesFiltradas(
            posiciones.filter(equipos => equipos.division === division && equipos.categoria === categoria)
            .sort((a,b) => (b.pts * 1000 + b.dif) - (a.pts * 1000 + a.dif)) )
        
    },[division, categoria])

    useEffect(() => {
        const isCopaGchu = division === 'copa gchu' ? selectCopa : selectDivision;
        setSelectsOptions(isCopaGchu)

        if( division === 'a' || 'b' && categoria.startsWith('grupo') ){
            setCategoria('primera')
        }
        if( division === 'copa gchu' && !categoria.startsWith('grupo') ){
            setCategoria('grupo a')
        }

    }, [division])

    const changeSelectDivision = (event) => {
        const value = event.target.value;
        setDivision(value)
    } 

    const changeSelectCategoria = (event) => {
        const value = event.target.value;
        setCategoria(value)
    } 

    return (
        <main>

            <section className='tabla-container posiciones-container'>

                <ImagenPublicitaria 
                    imgSrc='https://drive.google.com/uc?export=view&id=1LrjYPiQw1lLwyKPrGE_ERzI42pYxIpiM&rl'
                    alto='300px'
                    ancho='100%'
                    >
                </ImagenPublicitaria>

                <Title>Posiciones</Title>

                <form >
                    <select value={division} name="division" id="division"  onChange={changeSelectDivision}>
                        <option  value="a">division a</option>
                        <option  value="b">division b</option>
                        <option  value="copa gchu">copa gchu</option>
                    </select>
                    <select value={categoria} name="categoria" id="categoria" onChange={changeSelectCategoria}>
                        { selectsOptions.map(item => <option key={item.value} value={item.value} > {item.text} </option>) }
                    </select>
                </form>

                <table>
                    <thead>
                        <tr>
                            {THEAD.map(header => <th className={header?.className} > {header.name} </th> )}
                        </tr>
                    </thead>
                    <tbody>
                        {posicionesFiltradas?.map((item, idx) => {
                                    return(
                                        <tr key={item.id}>
                                            <td>{idx + 1}</td>
                                            <td className='td-nombreEquipo'>
                                                <span className='td-escudoEquipo'><img src={item.escudo_equipo} alt={`escudo del equipo ${item.nombre_equipo}`} /></span>
                                                <span className='td-nombreEquipoLargo'> {item.nombre_equipo} </span>
                                                <span className='td-nombreEquipoCorto'> {item.nombre_equipo_short} </span>
                                            </td>
                                            <td>{item.pts}</td>
                                            <td>{item.pj}</td>
                                            <td>{item.pg}</td>
                                            <td>{item.pe}</td>
                                            <td>{item.pp}</td>
                                            <td className='td-goles'>{item.gf}</td>
                                            <td className='td-goles'>{item.gc}</td>
                                            <td>{item.dif}</td>
                                        </tr>
                                    )
                                })}
                    </tbody>
                </table>
                <div className='genericButton-container'>
                    <GenericButton to='/calendario'>ver partidos</GenericButton>
                </div>
            </section>

        </main>
    )
}

export default Posiciones