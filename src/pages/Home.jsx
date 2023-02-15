import React, { useState, useEffect } from 'react'
// estilos
import './Home.css'
import 'react-multi-carousel/lib/styles.css';
// componentes
import Title from '../components/Title'
import ImagenPublicitaria from '../components/ImagenPublicitaria.jsx';
import Carousel from 'react-multi-carousel';
import GenericButton from '../components/GenericButton';
import Modal from '../components/Modal';
// constantes
import { EQUIPOS } from '../utils/constantes/equipos';
import { PARTIDOS } from '../utils/constantes/partidos';
import { getData } from '../utils/functions/getData';
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

const Home = ( ) => {
    // noticias
    const [ noticias, setNoticias ] = useState([]);

    // mini tabla de posiciones
    const [ posiciones, setPosiciones ] = useState(EQUIPOS);
    const [ posicionesPreviewA, setPosicionesPreviewA ] = useState(posiciones.filter(equipos => equipos.division === 'a' && equipos.categoria === 'primera')
        .sort((a,b) => (b.pts * 1000 + b.dif) - (a.pts * 1000 + a.dif)).slice(0,3));
    const [ posicionesPreviewB, setPosicionesPreviewB ] = useState(posiciones.filter(equipos => equipos.division === 'b' && equipos.categoria === 'primera')
        .sort((a,b) => (b.pts * 1000 + b.dif) - (a.pts * 1000 + a.dif)).slice(0,3));

    /* galeria */
    const [ openModal, setOpenModal ] = useState(false);
    const [ image, setImage ] = useState();

    const handleModal = (e) => {
        setOpenModal(!openModal)
        const src = e.target.attributes.src?.value
        if(!src) { return } else {setImage(src)}
        
    }

    useEffect(() => {
        const endpoint = '/noticias';
        getData(endpoint).then(setNoticias);
    }, [] )

    return(
        <main className='home'>
            {/* Publicidad  */}
            < ImagenPublicitaria 
                imgSrc='https://drive.google.com/uc?export=view&id=19v-ANas16mSa8DlGOzklBgv04fpUnqKS&rl'
                alto='270px'
                ancho='100%'
                to='/contacto'
                >
            </ImagenPublicitaria >
            
            {/* carrusel */}
            <section className='carrusel-container'>
                <Carousel responsive={responsive}  >
                    {
                        PARTIDOS.slice(0, 6).map(partido => {
                            return (
                                <article className='carrusel-articulo'>
                                    <div className="carrusel-fila">
                                        <div className="carrousel-groupItem carrusel-infoPartido">
                                            <span className=''> {partido.division !== 'copa gchu' ? `division ${partido.division}` : 'copa gchu'} </span>
                                            <span className=''> {`fecha ${partido.jornada}`} </span>
                                        </div>
                                    </div>
                                    <div className='carrusel-fila'>
                                        <div className='carrusel-groupItem carrusel-escudo'>
                                            <img src={partido.local.escudo_equipo} alt={partido.local.nombre_equipo} />
                                        </div>
                                        <div className='carrusel-groupItem carrusel-equipo'>
                                            <span> {partido.local.nombre_equipo_short} </span>
                                        </div>
                                        <div className='carrusel-groupItem carrusel-gol-dia'>
                                            <span> {!partido.golLocal && !partido.golVisitante ? partido.dia : partido.golLocal} </span>
                                        </div>
                                    </div>
                                    <div className='carrusel-fila'>
                                        <div className='carrusel-groupItem carrusel-escudo'>
                                            <img src={partido.visitante.escudo_equipo} alt={partido.visitante.nombre_equipo} />
                                        </div>
                                        <div className='carrusel-groupItem carrusel-equipo'>
                                            <span> {partido.visitante.nombre_equipo_short} </span>
                                        </div>
                                        <div className='carrusel-groupItem carrusel-gol-dia'>
                                            <span> {!partido.golVisitante && !partido.golVisitante ? partido.hora : partido.golVisitante} </span>
                                        </div>
                                    </div>
                                </article>
                            )
                        })
                    }
                </Carousel>
                <GenericButton to='/calendario'>mas partidos</GenericButton>
            </section>

            {/* seccion de noticias  -- 4 noticias en forma de cuadrado  */}
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
            <section className='galeria-container'>
                <Title>galeria</Title>
                <div className='galeria-gridContainer'>
                    <img onClick={handleModal} src="https://antoninosartori.github.io/coder-project/img/galeria/img4.png" alt="" />
                    <img onClick={handleModal} src="https://antoninosartori.github.io/coder-project/img/galeria/img1.png" alt="" />
                    <img onClick={handleModal} src="https://antoninosartori.github.io/coder-project/img/galeria/img3.png" alt="" />
                </div>
                { openModal && < Modal handleModal={handleModal} image={image} /> }
            </section>
                
            
        </main>
        
    )
}

export default Home