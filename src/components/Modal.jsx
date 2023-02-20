import React, { useState } from 'react'
import './Modal.css'
import 'react-multi-carousel/lib/styles.css';
// componentes
import Carousel from 'react-multi-carousel';
// constantes
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1024, min: 992 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 992, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

const Modal = ( { handleModal, image, indice, imagenes } ) => {
    return(
        <>
        {/* <div className='modal-container'>
            <div>
                <button onClick={handleModal} className='modal-cierre'>×</button>
                <img className='modal-image' src={image} alt="imagen abierta en pantalla grande" />
            </div>
        </div> */}
        <div className='modal-container'>
            <div>
                <button onClick={handleModal} className='modal-cierre'>×</button>
                <Carousel responsive={responsive} >
                    { imagenes.map(img => <img className='modal-image' src={img.src} alt={img.alt} /> ) }
                </Carousel>
            </div>
        </div>
        </>
    )
}

export default Modal