import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import carrinho from '/cart.png';
import { useAuthStore } from '../hooks/useAuthStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import useCarrinho from '../hooks/useCarrinho';

const NavBar: React.FC = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const carrinho = useCarrinho();
  return (
    <>

      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#371B58', paddingRight: '10px', paddingLeft: '10px' }}>
        <a className="navbar-brand" href="/">MusicasAPP</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate("/planos")}>Planos</button>
            </li>
            {authStore.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => navigate("/musicas")}>Musicas</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => navigate("/gerenciarMusicas")}>Gerenciar Musicas</button>
                </li>
              </>
            ) : (<></>)}

          </ul>
        </div>

        <button className="btn btn-light" onClick={() => navigate("/carrinho")}>
          <FontAwesomeIcon icon={faCartShopping} />
          {carrinho.produtos.length > 0 && (
            <span className="badge badge-danger" style={{color: "black"}} >{carrinho.totalProdutos}</span>
          )}
        </button>
      </nav>

    </>
  );
};

export default NavBar;