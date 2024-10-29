import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, onEdit, onDelete }) => (
  
  <div className="pokemon-card">
    <img src={pokemon.image} alt={pokemon.nome} />
    <div>
      <h3>{pokemon.nome}</h3>
      <p>Tipos: {pokemon.tipo}</p>
      <p>Habilidades: {pokemon.abilities}</p>
      <p>Peso: {pokemon.peso}</p>
      <button onClick={() => onEdit(pokemon)}>Editar</button>
      <button onClick={() => onDelete(pokemon.id)}>Excluir</button>
    </div>
  </div>
);

export default PokemonCard;
