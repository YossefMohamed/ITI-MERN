import React from 'react'
import {Link, NavLink} from'react-router-dom'

function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <NavLink activeClassName="active" className='nav-item' to="/products"> Products </NavLink>
    </nav>
  )
}

export default NavBar