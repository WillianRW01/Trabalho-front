import React, { useContext } from 'react';
import './PokemonCard.css';
import { AuthContext } from '../../auth/Context';
import typeColors from '../../utils/typeColors';
 
const PokemonCard = ({ pokemon, onEdit, onDelete }) => {
  const { role } = useContext(AuthContext);
  const backgroundColor = typeColors[pokemon.tipo.split(', ')[0].toLowerCase()] || '#fff';
 
  return (
    <div className="pokemon-card" style={{ backgroundColor }}>
      <img src={pokemon.imagem} alt={pokemon.nome} className="pokemon-image" />
      <h2>{pokemon.nome}</h2>
      <p>Tipos: {pokemon.tipo}</p>
      <p>Habilidades: {pokemon.habilidade}</p>
      <p>Peso: {pokemon.peso}</p>
      {role === 'admin' && (
        <button
          onClick={() => onEdit(pokemon.id)}
          style={{ backgroundColor, color: '#fff' }}
        >
          Editar
        </button>
      )}
      {role === 'admin' && (
        <button
          onClick={() => onDelete(pokemon.id)}
          style={{ backgroundColor, color: '#fff' }}
        >
          Excluir
        </button>
      )}
    </div>
  );
};
 
export default PokemonCard;
 