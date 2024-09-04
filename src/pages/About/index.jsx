import './styles.css'

export default function About() {
    return (
        <div className="container">
            <div className="image-container">
                <img src="https://images.secretlab.co/theme/common/collab_pokemon_catalog_charizard-min.png" alt="Exemplo de imagem" className="image" />
            </div>
            <div className="text-container">
                <h1>Projeto Pokedex</h1>
                <p>
                    Em um mundo onde a tecnologia e a nostalgia se encontram, um projeto fascinante ganha vida: um aplicativo baseado na web que utiliza a API pública do Pokémon para oferecer uma experiência imersiva aos fãs da série. Este projeto visa criar uma plataforma interativa onde os usuários podem explorar, buscar e aprender sobre seus Pokémon favoritos, aproveitando a riqueza de dados disponíveis na API do Pokémon.
                </p>
            </div>
        </div>
    )
}
