import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, onEdit, onDelete }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.imagem} alt={pokemon.nome} className="pokemon-image" />
      <h2>{pokemon.nome}</h2>
      <p>Tipos: {pokemon.tipo}</p>
      <p>Habilidades: {pokemon.habilidade}</p>
      <p>Peso: {pokemon.peso}</p>
      <button onClick={onEdit}>Editar</button>
      <button onClick={() => onDelete(pokemon.id)}>Excluir</button>
    </div>
  );
};

export default PokemonCard;
