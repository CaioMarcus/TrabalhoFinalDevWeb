import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
    <h2 className='text-center top-text'>Bem-Vindo ao MusicasAPP</h2>
    <div className="container d-flex flex-column align-items-center justify-content-center center-with-title"}>
      <div className="text-center">
        <div className="mb-3">
          <Link to="/pricing" className="btn btn-primary btn-lg">
            Conhecer Nossos Planos
          </Link>
        </div>
        <p>
          Já possui uma conta?{' '}
          <Link to="/login" className="text-link">
            Entre.
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default HomePage;
