import React, { useState, useEffect } from 'react'
import './Home.css'
import Title from '../components/Title'
import ImagenPublicitaria from '../components/ImagenPublicitaria.jsx';
import { EQUIPOS } from '../utils/constantes/equipos';
import GenericButton from '../components/GenericButton';

// constantes
const THEAD = [
    {name: 'pos'},
    {name: 'equipo'},
    {name: 'pts'},
    {name: 'pj'},
];

const Home = ( { lastPartidos } ) => {
    // noticias
    const [ noticias, setNoticias ] = useState([]);

    // carrusel
    console.log(lastPartidos.slice(0,5).reverse());
    
    // mini tabla de posiciones
    const [ posiciones, setPosiciones ] = useState(EQUIPOS);
    const [ posicionesPreviewA, setPosicionesPreviewA ] = useState(posiciones.filter(equipos => equipos.division === 'a' && equipos.categoria === 'primera')
        .sort((a,b) => (b.pts * 1000 + b.dif) - (a.pts * 1000 + a.dif)).slice(0,3));
    const [ posicionesPreviewB, setPosicionesPreviewB ] = useState(posiciones.filter(equipos => equipos.division === 'b' && equipos.categoria === 'primera')
        .sort((a,b) => (b.pts * 1000 + b.dif) - (a.pts * 1000 + a.dif)).slice(0,3));

    useEffect(() => {
        fetch('https://sheetdb.io/api/v1/yfbfn065or6yn?sheet=noticias')
        .then((response) => response.json())
        .then((data) => setNoticias(data));
    }, [] )

    return(
        <main className='home'>
            {/* Publicidad  */}
            < ImagenPublicitaria 
                imgSrc='https://drive.google.com/uc?export=view&id=19v-ANas16mSa8DlGOzklBgv04fpUnqKS&rl'
                alto='270px'
                ancho='100%'
                >
            </ImagenPublicitaria >

            {/* carrusel */}
            <section className='carrusel-container'>

            </section>
        
            {/* seccion de noticias  -- 4 noticias en forma de cuadrado  */}
            <section className='noticias-container'>
                <Title>noticias</Title>
                <div className='noticias-flexContainer'>
                    {noticias.map(noticia => {
                        return(
                            <article key={noticia.id} className='noticia-articulo'>
                                <div className="noticia-itemGroup">
                                    <h2 className='noticia-titulo'> {noticia.titulo_noticia} </h2>
                                </div>
                                <div className='noticia-itemGroup'>
                                    <p className='noticia-cuerpo'> {noticia.cuerpo_noticia} </p>
                                </div>
                                <div className='noticia-itemGroup noticia-itemGroup--img'>
                                    <figure className='noticia-etiquetaContainer'>
                                        <span className='noticia-etiquetaNombre'> {noticia.etiqueta} </span>
                                    </figure>
                                    <img className='noticia-imagen' src={noticia.imagen_noticia_url} alt={`Noticia de la liga de futbol gualeguaychu sobre ${noticia.etiqueta}`} />
                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>

            {/* mini tabla de posiciones */}
            <section className='tabla-container posicionesPreview-container'>
                
                <div className='posicionesPreview-sideContainer'>
                    <h2>Division A</h2>
                    <table>
                        <thead>
                            <tr>
                                {THEAD.map(header => <th> {header.name} </th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {posicionesPreviewA?.map((item, idx) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{idx + 1}</td>
                                        <td className='td-nombreEquipo'>
                                            <span className='td-escudoEquipo'><img src={item.escudo_equipo} alt="" /></span>
                                            <span className='td-nombreEquipoLargo'> {item.nombre_equipo} </span>
                                            <span className='td-nombreEquipoCorto'> {item.nombre_equipo_short} </span>
                                        </td>
                                        <td>{item.pts}</td>
                                        <td>{item.pj}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='posicionesPreview-sideContainer'>
                    <h2>Division B</h2>
                    <table>
                        <thead>
                            <tr>
                                {THEAD.map(header => <th> {header.name} </th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {posicionesPreviewB?.map((item, idx) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{idx + 1}</td>
                                        <td className='td-nombreEquipo'>
                                            <span className='td-escudoEquipo'><img src={item.escudo_equipo} alt="" /></span>
                                            <span className='td-nombreEquipoLargo'> {item.nombre_equipo} </span>
                                            <span className='td-nombreEquipoCorto'> {item.nombre_equipo_short} </span>
                                        </td>
                                        <td>{item.pts}</td>
                                        <td>{item.pj}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <GenericButton to={'/posiciones'} > mas posiciones </GenericButton>
            </section>

            {/* publicidad */}
            <ImagenPublicitaria
                imgSrc='https://drive.google.com/uc?export=view&id=1_V257QeLFxXfHGM2j9--zsPdFyYIw0zL&rl'
                alto='80px'
                ancho='100%'
                link='https://kumpel.com.ar/'
                >
            </ImagenPublicitaria>


            {/* galeria */}

            
        </main>
    )
}

export default Home