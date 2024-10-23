import { Link } from 'react-router-dom'
import './styles.css'

export default function Header() {
    return (
        <header id="cabecalho">
            <h1 className='textTitle'>Projeto Pokedex - API</h1>
            <nav>
                <ul>
                    <li><Link to="/cadastro">Cadastro</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/about">Sobre</Link></li>
                    <li><Link to="/noticia">Notícia</Link></li>
                    <li><Link to="/videos">Vídeos</Link></li>
                    <li><Link to="/itens">Itens</Link></li>
                    <li><Link to="/pokedex">Pokedex</Link></li>
                    <li><Link to="/criarpokemon">Cadastrar Pokemon</Link></li>
                </ul>
            </nav>
        </header>
    )
}