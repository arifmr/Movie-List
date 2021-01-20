import React from 'react'
import {NavLink} from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav className="navbar p-3">
        <NavLink exact to="/" className="ml-3" activeStyle={{fontWeight: "bold", color: "red"}} ><h3>Home</h3></NavLink>
        <NavLink exact to="/movies" className="ml-auto" activeStyle={{fontWeight: "bold", color: "red"}} ><h3>Movies</h3></NavLink>
        <NavLink exact to="/series" className="ml-5" activeStyle={{fontWeight: "bold", color: "red"}}><h3>Series</h3></NavLink>
        <NavLink exact to="/favorites" className="ml-5 mr-3" activeStyle={{fontWeight: "bold", color: "red"}}><h3>Favorites</h3></NavLink>
      </nav>
    </div>
  )
}

export default Navbar