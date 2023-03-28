import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import './Contacto.css'
// componentes
import Title from '../components/Title'
import MensajeEmail from '../components/MensajeEmail';
// assets
import mail from '../assets/mail_green.svg'

const Contacto = () => {
    window.scrollTo(0, 0);
    
    const [sent, setSent] = useState(false);
    const [notSent, setNotSent] = useState(false);
    const [isNotValidate, setIsNotValidated] = useState('');


    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(!email || !name || !message){
            return setIsNotValidated('Completa todos los campos');
        }

        if(email && !regexEmail.test(email)){
            return setIsNotValidated('Ingresa un email válido');
        }

        if(message.length < 4){
            return setIsNotValidated('Ingresa un mensaje mas largo');
        }

        emailjs.sendForm('service_95hd7jp', 'template_x5de1xd', form.current, 'GHdLU3YvG2rZWh35k')
        .then(
            (result) => {
                setIsNotValidated(false);
                setSent(true);
                console.log(result.text);
                e.target.reset();
            }, (error) => {
                console.log(error.text);
                setSent(false);
                setIsNotValidated(false);
                setNotSent(true);
            });
    };

    return(
        <main>
            <section className='contacto'>
                <Title>contacto</Title>
                <div className="contacto-container">
                    <div className="contacto-informacion">
                        <div className='contacto-informacion--publicidad'>
                            <img src={mail} alt="imagen de mail" />
                            <p>Si estás interesado en publicitar en Futbol Gchu completá el formulario con tus datos.</p>
                        </div>
                        <div className='contacto-informacion--disclaimer'>
                            <p>Futbol Gchu es desarrollado y administrado por <span>Kumpel</span>.</p>
                            <p>Kumpel es una organización independiente y no tiene relación con ninguna liga ni entidad.</p>
                        </div>
                    </div>

                    <form ref={form} className='contacto-form' onSubmit={sendEmail}>
                        <input className='contacto-form--input contacto-form--name' type="text" name='name' placeholder='Nombre'/>
                        <input className='contacto-form--input contacto-form--email' type="email" name='email'  placeholder='Email'/>
                        <textarea className='contacto-form--input contacto-form--message' name="message" id="" cols="30" rows="10" placeholder='Escribe tu mensaje'></textarea>
                        <button className='contacto-form--input contacto-form--button' type='submit'>Enviar</button>

                        {isNotValidate && !sent &&
                            < MensajeEmail
                                mensaje={isNotValidate}
                                estado={false}
                            />
                        }
                        {sent && !isNotValidate &&
                            < MensajeEmail
                                mensaje={'¡Mensaje Enviado! Será respondido a la brevedad. Muchas gracias'}
                                estado={true} />
                        }
                        {notSent && !sent && !isNotValidate &&
                            < MensajeEmail
                                mensaje={`Lo siento, no pudimos enviar su mensaje`}
                                estado={false} />
                        }

                    </form>
                </div>
            </section>
        </main>
    )
}

export default Contacto