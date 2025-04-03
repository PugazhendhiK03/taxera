import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faUserCircle, faSignInAlt, faUserPlus, faSignOutAlt, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import '../styles/Navbar.css'; // Assuming you have a CSS file for styling
import Logo from '../assets/image/logo.png'

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <Link to="/" className="logo">
        <img src={Logo} alt="Logo" />
        <span className="company-name">
          <big>T</big>AXERA <br /><span>Save Time, Save Tax!</span>
        </span>
      </Link>
      
      <nav>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`} id="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {user?.role === 'admin' && (
            <li className="mobile-admin-link"><Link to="/admin">Admin</Link></li>
          )}
        </ul>
        
        <div className="nav-right">
          {user?.role === 'admin' && (
            <Link to="/admin" className="desktop-admin-link">Admin</Link>
          )}
          
          <div className="user-menu" ref={dropdownRef}>
            <button className="user-icon" onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faUserCircle} className="user-account-icon" />
              {user && <span className="username">{user.name}</span>}
            </button>
            
            {dropdownOpen && (
              <div className="dropdown-menu">
                {!user ? (
                  <>
                    <Link to="/login" className="dropdown-item">
                      <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </Link>
                    <Link to="/register" className="dropdown-item">
                      <FontAwesomeIcon icon={faUserPlus} /> Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/user" className="dropdown-item">
                      <FontAwesomeIcon icon={faUserCircle} /> Dashboard
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="dropdown-item mobile-admin-link">
                        <FontAwesomeIcon icon={faUserCog} /> Admin Panel
                      </Link>
                    )}
                    <button onClick={logout} className="dropdown-item">
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="menu-toggle" onClick={toggleMenu}>
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;