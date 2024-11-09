import React, { useContext } from 'react';
import './PokemonCard.css';
import { AuthContext } from '../../auth/Context';

const PokemonCard = ({ pokemon, onEdit, onDelete }) => {
  const { role } = useContext(AuthContext); 

  return (

    <div className="pokemon-card">
      <img src={pokemon.imagem} alt={pokemon.nome} className="pokemon-image" />
      <h2>{pokemon.nome}</h2>
      <p>Tipos: {pokemon.tipo}</p>
      <p>Habilidades: {pokemon.habilidade}</p>
      <p>Peso: {pokemon.peso}</p>
      {role === 'admin' && (
        <button onClick={() => onEdit(pokemon.id)}>Editar</button> 
      )}
      {role === 'admin' && (
        <button onClick={() => onDelete(pokemon.id)}>Excluir</button>
      )}
    </div>
  );
};

export default PokemonCard;
