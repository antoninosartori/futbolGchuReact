import React from 'react'
import './Footer.css'
import sportsSoccer from '../assets/sports_soccer.svg'
import linkedIn from '../assets/linkedIn.svg'
import mail from '../assets/mail.svg'
import logoKumpel from '../assets/logoKumpel.svg'
// componentes
import { Link } from 'react-router-dom'

const Footer = () => {
    return(
        <footer>
            <nav>
                <div className='footer-texto'>
                    <div className='footer-logo'>
                        <img src={sportsSoccer} alt="logo de Futbol Gchu" />
                        <span>FG</span>
                    </div>
                    <h4>Futbol Gchu es desarrollado y administrado por <a href='https://www.kumpel.com.ar' target='_blank' >Kumpel</a>.</h4>
                </div>
                <div className='footer-redes'>
                    <a href="https://www.kumpel.com.ar" target='_blank'>
                        <img  src={logoKumpel} alt="Logo de Kumpel" />
                    </a>
                    <a href="https://www.linkedin.com/company/kumpel/" target='_blank'>
                        <img  src={linkedIn} alt="perfil de linkedIn de Kumpel" />
                    </a>
                    <Link to="/contacto">
                        <img src={mail} alt="Mail de Kumpel" />
                    </Link>
                </div>
            </nav>
        </footer>
    )
}

export default Footer