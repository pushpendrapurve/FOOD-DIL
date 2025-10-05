import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />

      <div className="nav-profile">
        <img className='profile' src={assets.profile_image} alt=""/>
        <div className='nav-profile-dropdown'>
          <button onClick={()=>setToken('')} className='logout-btn'>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
