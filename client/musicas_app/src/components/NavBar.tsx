import React from 'react';
import { Link } from 'react-router-dom';
import carrinho from '/cart.png';

const NavBar: React.FC = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#371B58'}}>

      <div className="container">
      <Link to="/" className="navbar-brand">
        MusicasAPP
      </Link>

      <Link to="/carrinho" style={{ textDecoration: "none" }}>
        <img className="d-none d-md-block" src={carrinho} style={{ width: "35px" }} />
      </Link>
      
      </div>
    </nav>
    </>
  );
};

export default NavBar;