import './styles.css';
import React, { useState } from 'react';
import { createUser } from './../../api/user';
import { useNavigate } from 'react-router-dom';

export default function Cadastrar(){
    const navigate = useNavigate();

    const handleBackClick = () =>{
        navigate(-1);
    }

    const [name, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        console.log({name, email, senha})
        const responseApi = await createUser({name, email, senha})
        console.log(responseApi)
        if(responseApi.id){
          navigate('/login')
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

                <label htmlFor="Name">Name:</label>
                    <input
                       onChange={(e) => setNome(e.target.value)}
                        type="text"
                        id="name"
                        placeholder="Digite seu name"
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                         onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        id="email"
                        placeholder="Digite seu email"
                        required
                    />
    
                    <label htmlFor="senha">Senha:</label>
                    <input
                     onChange={(e) => setSenha(e.target.value)}
                        type="password"
                        id="senha"
                        placeholder="Digite sua senha"
                        required
                    />
    
                    <button type="submit " onClick={handleSubmit} className="login-button">Cadastrar</button>
                    <br></br>
                    <button className="button back-button" onClick={handleBackClick}>Cancelar</button>
                </form>
            </div>
        );
    }

