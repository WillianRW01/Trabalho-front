import './styles.css';
import React, { useState } from 'react';
import { criarPokemon } from './../../api/pokemon';
import { useNavigate } from 'react-router-dom';

export default function Cadastrar() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [habilidade, setHabilidade] = useState('');
    const [peso, setPeso] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log({ nome, tipo, habilidade, peso })
            const responseApi = await criarPokemon({ nome, tipo, habilidade, peso })
            console.log(responseApi)
            if (responseApi.id) {
                navigate('/')
            } else {
                console.log(responseApi)
            }
        } catch (error) {
            console.log(error)
            if (error.status === 403) {
                return alert("Sem permissão.");
            }
            if (error.status === 401 || error.status === 404) {
                return alert('Email ou senha inválido, tente novamente!');
            }
            alert('Erro inesperado, tente novamente mais tarde!');
        }
    };


    return (
        <div id="loginpage" className="login-container">
            <h1>Cadastro</h1>
            <form className="login-form">

                <label htmlFor="Nome">Nome:</label>
                <input
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    id="name"
                    placeholder="Digite seu nome"
                    required
                />
                <label htmlFor="Tipo">Tipo:</label>
                <input
                    onChange={(e) => setTipo(e.target.value)}
                    type="text"
                    id="tipo"
                    placeholder="Digite o tipo do Pokemon"
                    required
                />

                <label htmlFor="habilidade">Habilidade:</label>
                <input
                    onChange={(e) => setHabilidade(e.target.value)}
                    type="text"
                    id="habilidade"
                    placeholder="Digite a habilidade do pokemon"
                    required
                />

                <label htmlFor="peso">Peso:</label>
                <input
                    onChange={(e) => setPeso(e.target.value)}
                    type="password"
                    id="peso"
                    placeholder="Digite o Peso do Pokemon"
                    required
                />

                <button type="submit " onClick={handleSubmit} className="login-button">Cadastrar</button>
                <button className="button back-button" onClick={handleBackClick}></button>
            </form>
        </div>
    );
}

