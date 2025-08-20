import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  // '' for '/', or the first path segment otherwise
  const currentPath = location.pathname === '/'
    ? ''
    : location.pathname.split('/')[1];

  const handleToggle = () => setMobileMenu(!mobileMenu);

  const menuItems = [
    { label: 'Shop', path: '' },
    { label: 'Mens', path: 'mens' },
    { label: 'Womens', path: 'womens' },
    { label: 'Kids', path: 'kids' },
  ];

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>
          <span className="line1">The Curiosity</span><br/>
          <span className="line2">Corner 🛒</span>
        </p>
      </div>

      {/* Nav Links */}
      <div className={`nav-menu ${mobileMenu ? 'active' : ''}`}>
        {menuItems.map(({ label, path }) => (
          <Link to={`/${path}`} key={path || 'shop'} style={{ textDecoration: 'none' }}>
            <li
              onClick={handleToggle}
              className={currentPath === path ? 'active' : ''}
            >
              <span>{label}</span>
            </li>
          </Link>
        ))}
      </div>

      {/* Login, Cart & Hamburger */}
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}} className="logout">Logout</button>:
        <Link to="/login"><button className="login">Login</button></Link>}
        <div className="cart-icon-container">
          <Link to="/cart"><img src={cart_icon} alt="Cart" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        <div className="hamburger" onClick={handleToggle}>&#9776;</div>
      </div>
    </div>
  );
};

export default Navbar;
