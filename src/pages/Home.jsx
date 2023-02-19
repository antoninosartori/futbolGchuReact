import React, { useState, useEffect } from 'react'
// estilos
import './Home.css'
import 'react-multi-carousel/lib/styles.css';
// componentes
import Carousel from 'react-multi-carousel';
import Title from '../components/Title'
import ImagenPublicitaria from '../components/ImagenPublicitaria.jsx';
import GenericButton from '../components/GenericButton';
import Modal from '../components/Modal';
// constantes
import { EQUIPOS } from '../utils/constantes/equipos';
import { PARTIDOS } from '../utils/constantes/partidos';
import { getData } from '../utils/functions/getData';
import { URL_API } from '../utils/constantes/url';
const THEAD = [
    {name: 'pos'},
    {name: 'equipo'},
    {name: 'pts'},
    {name: 'pj'},
];
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 992 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 992, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};
// assets
import diaPartido from '../assets/diaPartido.svg'
import horaPartido from '../assets/horaPartido.svg'

const Home = ( ) => {
    // noticias
    const [ noticias, setNoticias ] = useState([]);

    useEffect(() => {
        const URL = URL_API;
        const endpoint = '/noticias';
        getData(URL, endpoint).then(setNoticias);
    }, [] )

    // mini tabla de posiciones
    const [ posiciones, setPosiciones ] = useState(EQUIPOS);
    const [ posicionesPreviewA, setPosicionesPreviewA ] = useState(posiciones.filter(equipos => equipos.division === 'a' && equipos.categoria === 'primera')
        .sort((a,b) => (b.pts * 1000 + b.dif) - (a.pts * 1000 + a.dif)).slice(0,3));
    const [ posicionesPreviewB, setPosicionesPreviewB ] = useState(posiciones.filter(equipos => equipos.division === 'b' && equipos.categoria === 'primera')
        .sort((a,b) => (b.pts * 1000 + b.dif) - (a.pts * 1000 + a.dif)).slice(0,3));

    // galeria
    const [ openModal, setOpenModal ] = useState(false);
    const [ image, setImage ] = useState();
    const [ galeria, setGaleria ] = useState([])

    useEffect(() => {
        const URL = './galeria'
        const endpoint = '.json'
        getData(URL, endpoint).then(setGaleria)
    }, [])

    const handleModal = (e) => {
        setOpenModal(!openModal)
        const src = e.target.attributes.src?.value
        if(!src) { return } else {setImage(src)}
    }

    return(
        <main className='home'>
            {/* Publicidad  */}
            < ImagenPublicitaria 
                imgSrc='https://drive.google.com/uc?export=view&id=1WkILwU3WfsrlJpRY47p8zJWGzfgQPi-i&rl'
                alto='270px'
                ancho='100%'
                to='/contacto'
                > 
                    <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems:'center',justifyContent:'center', backgroundColor: '#0000003f', padding: '10px', borderRadius: '10px'}}>
                        <h3 style={{color: '#fff', fontSize: '30px'}}>Publicita Aqui</h3>
                        <p style={{color: '#fff', fontSize: '30px'}}>Lleva tu negocio al siguiente nivel en FG</p>
                    </div>
            </ImagenPublicitaria >
            
            {/* carrusel */}
            <section className='carrusel-container'>
                <Carousel responsive={responsive}  >
                    {
                        PARTIDOS.filter(partido => partido.categoria === "copa gchu" || "primera").slice(0, 6).map(partido => {
                            return (
                                <article className='carrusel-articulo'>
                                    <div className="carrusel-fila">
                                        <div className="carrousel-groupItem carrusel-infoPartido">
                                            <span className=''> {partido.division !== 'copa gchu' ? `division ${partido.division}` : 'copa gchu'} </span>
                                            <span className=''> {partido.jornada !== 'cuartos' || 'semi' || 'final' ? `fecha ${partido.jornada}` : `${partido.jornada}` }</span>
                                        </div>
                                    </div>
                                    <div className='carrusel-fila'>
                                        <div className='carrusel-groupItem carrusel-escudo'>
                                            <img src={partido.local.escudo_equipo} alt={partido.local.nombre_equipo} loading='lazy' />
                                        </div>
                                        <div className='carrusel-groupItem carrusel-equipo'>
                                            <span> {partido.local.nombre_equipo_short} </span>
                                        </div>
                                        <div className={partido.golLocal || partido.golLocal === 0 ? `carrusel-groupItem carrusel-gol-dia` : `carrusel-groupItem carrusel-gol-dia carrusel-horaFecha--flexStart`}>
                                            { partido.golLocal || partido.golLocal === 0 ? <span> {partido.golLocal} </span> :
                                                <div className='carrusel-diaPartido'>
                                                    <img src={diaPartido} alt="dia del partido" loading='lazy' />
                                                    <span> {partido.dia} </span>
                                                </div> 
                                            }
                                            {/* <span> {partido.golLocal || partido.golLocal === 0 ? partido.golLocal : partido.dia} </span> */}
                                        </div>
                                    </div>
                                    <div className='carrusel-fila'>
                                        <div className='carrusel-groupItem carrusel-escudo'>
                                            <img src={partido.visitante.escudo_equipo} alt={partido.visitante.nombre_equipo} loading='lazy' />
                                        </div>
                                        <div className='carrusel-groupItem carrusel-equipo'>
                                            <span> {partido.visitante.nombre_equipo_short} </span>
                                        </div>
                                        <div className={partido.golVisitante || partido.golVisitante === 0 ? `carrusel-groupItem carrusel-gol-dia` : `carrusel-groupItem carrusel-gol-dia carrusel-horaFecha--flexStart`}>
                                            { partido.golVisitante || partido.golVisitante === 0 ? <span> {partido.golVisitante} </span> :
                                                <div className='carrusel-horaPartido'>
                                                    <img src={horaPartido} alt="hora del partido" loading='lazy' />
                                                    <span> {partido.hora} </span>
                                                </div> 
                                            }
                                        {/* <span> {partido.golVisitante || partido.golVisitante === 0 ? partido.golVisitante : partido.hora} </span> */}
                                        </div>
                                    </div>
                                </article>
                            )
                        })
                    }
                </Carousel>
                <GenericButton to='/calendario'>mas partidos</GenericButton>
            </section>

            {/* seccion de noticias  -- noticias en forma de cuadrado  */}
            <section className='noticias-container'>
                <Title>noticias</Title>
                <div className='noticias-flexContainer'>
                    {noticias.map(noticia => {
                        return (
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
                                    <img className='noticia-imagen' src={noticia.imagen_noticia_url} alt={`Noticia de la liga de futbol gualeguaychu sobre ${noticia.etiqueta}`} loading='lazy' />
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
                                            <span className='td-escudoEquipo'><img src={item.escudo_equipo} alt={`escudo del equipo ${item.nombre_equipo}`}  /></span>
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
                                            <span className='td-escudoEquipo'><img src={item.escudo_equipo} alt={`escudo del equipo ${item.nombre_equipo}`} /></span>
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
            <section className='galeria-container'>
                <Title>galeria</Title>
                <div className='galeria-gridContainer'>
                    { galeria.map(foto => {
                        return(
                            <img src={foto.src} alt={foto.alt} loading='lazy' onClick={handleModal} />
                        )
                    }) }
                </div>

                <div className='galeria-parrafoContainer'>
                    <div className='galeria-parrafos--flex'>
                        <p>¿Sos fotografo/a?</p>
                        <p>¡Podemos publicar tus fotos dandote credito!</p>
                    </div>
                    <GenericButton to='/contacto'>¡hablemos!</GenericButton>
                </div>

                { openModal && < Modal handleModal={handleModal} image={image} /> }
            </section>
            
        </main>
        
    )
}

export default Home