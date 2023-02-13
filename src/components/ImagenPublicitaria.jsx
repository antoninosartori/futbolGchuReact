import React, { Children } from 'react'

const ImagenPublicitaria = ({children, imgSrc, alto, ancho, link  }) => {
    const classList = `publicidad-container`;
    return(
        <section 
            className={classList} 
            style=
                {
                    {
                        backgroundImage: `url("${imgSrc}")`,
                        height: `${alto}`,
                        width: `${ancho}`
                    }   
                }
            >
                {link && <a className='publicidad-enlace' target='_blank' href={link}></a> }
                {children}
        </section>
    )
}
 
export default ImagenPublicitaria