import React from 'react'
import './GenericButton.css'
import { Link } from 'react-router-dom'

const GenericButton = ( { children, to } ) => {
    return(
            <Link className='genericButton-enlace' to={to}> {children} </Link>
    )
}

export default GenericButton