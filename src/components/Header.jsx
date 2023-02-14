import React from 'react'
import './Header.css'

// assets
import sportsSoccer from '../assets/sports_soccer_green.svg'
import NavItem from '../components/NavItem'
import { Link } from 'react-router-dom'

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
                <div className="nav-right">
                    {
                        navItems.map(navItem => {
                            return(
                                < NavItem key={navItem.name} path={navItem.path} > {navItem.name} </ NavItem>
                            )
                            })
                    }
                </div>
                
            </nav>
        </header>
    )
}

export default Header