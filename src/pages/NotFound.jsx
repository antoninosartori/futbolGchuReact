import React from 'react'
import './NotFound.css'
import Title from '../components/Title'
import redCard from '../assets/404Img.jpg'

const NotFound = () => {
    return(
        <main>
            <section className='NotFound-container'>
                <Title>¡lo siento! <br /> no pudimos encontrar lo que buscabas</Title>
                <img src={redCard} alt="Hombre sacando tarjeta roja" />
            </section>
        </main>
    )
}

export default NotFound