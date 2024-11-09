import { Link } from 'react-router-dom'
import './styles.css'
import { AuthContext } from '../../auth/Context';
import { useContext } from 'react';
 
export default function Header() {
    const { token } = useContext(AuthContext)
    const isLoginRoute = location.pathname === '/login';
    return (
        <header id="cabecalho">
             {
                    !isLoginRoute && !token
                        ? <Link to="/login">Entrar</Link>
                        : null
                }
            <h1 className='textTitle'>Projeto Pokedex - API</h1>
            <nav>
                <ul>
                    <li><Link to="/cadastro">Cadastro</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    { token && <li><Link to="/about">Sobre</Link></li>}
                    { token && <li><Link to="/noticia">Notícia</Link></li>}
                    { token && <li><Link to="/videos">Vídeos</Link></li>}
                    { token && <li><Link to="/itens">Itens</Link></li>}
                    { token && <li><Link to="/pokedex">Pokedex</Link></li>}
                    { token && <li><Link to="/perfil">Perfil</Link></li>}
                </ul>
            </nav>
        </header>
    )
}
 