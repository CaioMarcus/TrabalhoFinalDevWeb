import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#371B58'}}>
      <div className="container">
      <Link to="/" className="navbar-brand">
        MusicasAPP
      </Link>
      <div className="ml-auto">
        <Link to="/login" className="btn btn-light">
          Login
        </Link>
      </div>
      </div>
    </nav>
    </>
  );
};

export default NavBar;