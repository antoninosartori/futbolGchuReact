import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavItem.css'
const NavItem = ({children, path, closeMenu}) => {
    return(
        <NavLink onClick={closeMenu} className='navItem' to={path}>
            {children}
        </NavLink>
    )
}

export default NavItem