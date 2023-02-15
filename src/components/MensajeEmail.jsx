import React from 'react'
import './MensajeEmail.css'

const MensajeEmail = ( { mensaje, estado } ) => {
    const className = estado ? 'mensajeEnviado' : 'mensajeFallido';

    return(
        <div className='mensajeEmail-container'>
            <p className={className}>
                {mensaje}
            </p>
        </div>
    )
}

export default MensajeEmail