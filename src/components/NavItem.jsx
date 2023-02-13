import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavItem.css'
const NavItem = ({children, path}) => {
    return(
        <NavLink className='navItem' to={path}>
            {children}
        </NavLink>
    )
}

export default NavItem