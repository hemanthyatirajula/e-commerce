import React from 'react'
import "./Navbar.css"
import navlogo from '../../assets/logo.png'
import navprofile from '../../assets/navprofile.jpeg'
const Navbar = () => {
  return (
    <div className="navbar">
        <img src={navlogo} alt="" className='nav-logo'/>
           <p>
          <span className="line1">The Curiosity</span><br/>
          <span className="line2">Corner 🛒</span>
        </p>
       <div className="navprofilediv">
        <img src={navprofile} alt="" className='nav-profile'/>
         </div>
    </div>
  )
}

export default Navbar