import React from 'react'
import './Modal.css'

const Modal = ( { handleModal, image } ) => {
    return(
        <div className='modal-container'>
            <div>
                <button onClick={handleModal} className='modal-cierre'>×</button>
                <img className='modal-image' src={image} alt="imagen abierta en pantalla grande" />
                {/* <div style={{backgroundImage: `url("${image}")`}} className='modal-imageDiv'></div> */}
            </div>
        </div>
    )
}

export default Modal