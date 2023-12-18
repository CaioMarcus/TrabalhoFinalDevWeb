import React from 'react';
import LoginForm from '../forms/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <>
            <h2 className='text-center mb-4 top-text '>Entrar no MusicasAPP</h2>
            <div className="container">
                <div className="d-flex justify-content-center" style={{marginTop: '15vh'}}>
                    <LoginForm />
                </div>
            </div>
        </>
    );
};

export default LoginPage;
