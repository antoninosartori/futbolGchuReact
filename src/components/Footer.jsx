import React from 'react'
import './Footer.css'
import sportsSoccer from '../assets/sports_soccer.svg'
import instagram from '../assets/instagram.svg'
import mail from '../assets/mail.svg'
import logoKumpel from '../assets/logoKumpel.svg'
const Footer = () => {
    return(
        <footer>
            <nav>
                <div className='footer-texto'>
                    <div className='footer-logo'>
                        <img src={sportsSoccer} alt="" />
                        <span>FG</span>
                    </div>
                    <h4>Futbol Gchu es desarrollado y administrado por <span>Kumpel</span> .</h4>
                </div>
                <div className='footer-redes'>
                    <a href="https://www.kumpel.com.ar" target='_blank'>
                        <img  src={logoKumpel} alt="Instagram de Kumpel" />
                    </a>
                    <a href="https://www.instagram.com/kumpel/" target='_blank'>
                        <img  src={instagram} alt="Instagram de Kumpel" />
                    </a>
                    <a href="">
                        <img src={mail} alt="Mail de Kumpel" />
                    </a>
                </div>
            </nav>
        </footer>
    )
}

export default Footer