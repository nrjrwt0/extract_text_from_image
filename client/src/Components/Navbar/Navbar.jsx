import React from 'react';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './navbar.css';

const loggedOutLinks = [
  {
    to: '/login',
    title: 'Login',
  },
  {
    to: '/signup',
    title: 'Signup',
  },
];

const Navbar = () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <ul className='nav-list'>
        <li className='nav-item'>
          <Link className='nav-link logo' to='/'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/5137/5137270.png'
              alt='logo'
            />
          </Link>
        </li>
        {loggedIn ? (
          <>
            <li className='nav-item'>
              <Link className='nav-link' to='/image-to-text'>
                Image to Text
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/all-ocr'>
                Get All Ocr
              </Link>
            </li>
            <li className='nav-item'>
              <button className='button' onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {loggedOutLinks.map(({ to, title }) => {
              return (
                <li className='nav-item' key={to}>
                  <Link className='nav-link' to={to}>
                    {title}
                  </Link>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
