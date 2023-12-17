import React from 'react';
import LoginForm from '../forms/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <>
            <h2 className='top-text'>Entrar no MusicasAPP</h2>
            <div className="container">
                <div className="d-flex justify-content-center center-with-title">
                    <LoginForm />
                </div>
            </div>
        </>
    );
};

export default LoginPage;
