import React, { useState } from 'react'
import './Header.css'
// componentes
import { Link } from 'react-router-dom'
import NavItem from '../components/NavItem'
// assets
import sportsSoccer from '../assets/sports_soccer_green.svg'
import menuIcon from '../assets/list.svg'

const navItems = 
    [
        {
            name: 'inicio',
            path: '/'
        },
        {
            name: 'posiciones',
            path: '/posiciones'
        },
        {
            name: 'calendario',
            path: '/calendario'
        },
        {
            name: 'contacto',
            path: '/contacto'
        }
    ]

const Header = () => {
    const [isToggle, setIsToggle] = useState(false)

    const toggleMenu = () => {
        setIsToggle(!isToggle)
    }

    const classList = isToggle ? 'nav-right toggleMenu--active' : 'nav-right toggleMenu--inactive';

    return(
        <header>
            <nav>
                <div className="nav-left">
                    <div className='nav-logo'>
                        <Link to='/' className='nav-logo-link'>
                            <img src={sportsSoccer} alt="" />
                            <span>f</span>
                            <span>g</span>
                        </Link>
                    </div>
                    <div className="changeDarkMode"></div>
                </div>
                <div className={classList}>
                    {
                        navItems.map(navItem => {
                            return(
                                < NavItem key={navItem.name} path={navItem.path} closeMenu={toggleMenu} > {navItem.name} </ NavItem>
                            )
                            })
                    }
                </div>
                <button onClick={toggleMenu} className='nav-toggleMenu'> <img src={menuIcon} alt="boton del menu" /> </button>
                
            </nav>
        </header>
    )
}

export default Header