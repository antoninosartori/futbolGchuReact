import React, { Children } from 'react'
import { Link } from 'react-router-dom';

const ImagenPublicitaria = ({children, imgSrc, alto, ancho, link, to  }) => {
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
                {link && !to && <a className='publicidad-enlace' target='_blank' href={link}> { children } </a> }
                {!link && to && <Link className='publicidad-enlace' to={to}> { children } </Link> }
                
        </section>
    )
}
 
export default ImagenPublicitaria