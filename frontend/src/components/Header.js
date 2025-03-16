import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Import CSS file

const Header = () => {
  return (
    <>
    <div className="navbar">
       <NavLink to='/' className="nav-link">Home</NavLink> 
      <NavLink to='/upload' className="nav-link">Upload</NavLink>
      <NavLink to='/track' className="nav-link">Track</NavLink>
      <NavLink to='/backend_data' className="nav-link">Menu </NavLink> 
    </div>
    </>
  );
}

export default Header;
