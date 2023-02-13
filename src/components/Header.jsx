import React from 'react'
import './Header.css'

// assets
import NavItem from '../components/NavItem'

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
                {navItems.map(navItem => {
                    return(
                        < NavItem key={navItem.name} path={navItem.path} > {navItem.name} </ NavItem>
                    )
                })}
            </nav>
        </header>
    )
}

export default Header