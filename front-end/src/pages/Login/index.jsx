import './styles.css';
import React from 'react';

export default function Login() {
    return (
        <div id="loginpage" className="login-container">
            <h1>Login</h1>
            <form className="login-form">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Digite seu email"
                    required
                />

                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Digite sua senha"
                    required
                />

                <button type="submit" className="login-button">Entrar</button>
            </form>
        </div>
    );
}