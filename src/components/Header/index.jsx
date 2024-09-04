import { Link } from 'react-router-dom'
import './styles.css'

export default function Header() {
    return (
        <header id="cabecalho">
            <h1>Projeto Pokedex - API</h1>
            <nav>
                <ul>
                    <li><Link to="/about">Sobre</Link></li>
                    <li><Link to="/noticia">Notícia</Link></li>
                    <li><Link to="/videos">Vídeos</Link></li>
                    <li><Link to="/itens">Itens</Link></li>
                    <li><Link to="/pokedex">Pokedex</Link></li>
                </ul>
            </nav>
        </header>
    )
}