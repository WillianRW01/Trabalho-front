import React from 'react';  // Importação do React
import PokemonCard from '../PokemonCard/PokemonCard';  // Importação do componente PokemonCard
import './FavoriteList.css';  // Importação do CSS para o componente

const FavoriteList = ({ favorites, expandedPokemon, expandPokemon, toggleFavorite, getBackgroundColor }) => (
  <div>
    <h2>Pokémon Favoritos</h2>
    <div className="pokemon-grid">
      {favorites.map((pokemon, index) => (
        <PokemonCard
          key={index}
          pokemon={pokemon}
          expandedPokemon={expandedPokemon}
          expandPokemon={expandPokemon}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
          getBackgroundColor={getBackgroundColor}
        />
      ))}
    </div>
  </div>
);

export default FavoriteList;
