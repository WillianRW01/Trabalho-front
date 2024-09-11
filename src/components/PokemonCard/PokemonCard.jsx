import React from 'react';  // Import deve estar fora do JSX
import './PokemonCard.css'; // Estilos do componente

const PokemonCard = ({ pokemon, expandedPokemon, expandPokemon, toggleFavorite, favorites, getBackgroundColor }) => (
  <div 
    className={`pokemon-card ${expandedPokemon?.name === pokemon.name ? 'expanded' : ''}`}
    style={{ backgroundColor: getBackgroundColor(pokemon.typeArray) }} 
    onClick={() => expandPokemon(pokemon)}
  >
    <img src={pokemon.image} alt={pokemon.name} />
    <div>
      <h3>{pokemon.name}</h3>
      {expandedPokemon?.name === pokemon.name && ( 
        <div>
          <p>Tipos: {pokemon.types}</p>
          <p>Habilidades: {pokemon.abilities}</p>
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
          <button
            className="favorite-button"
            onClick={(e) => {
              e.stopPropagation(); 
              toggleFavorite(pokemon);
            }}
            style={{ backgroundColor: favorites.some((fav) => fav.name === pokemon.name) ? 'red' : '#ffcc00' }}
          >
            {favorites.some((fav) => fav.name === pokemon.name) ? 'Desfavoritar' : 'Favoritar'}
          </button>
        </div>
      )}
    </div>
  </div>
);

export default PokemonCard;
