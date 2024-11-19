import React, { useContext } from 'react';
import './PokemonCard.css';
import { AuthContext } from '../../auth/Context';
import typeColors from '../../utils/typeColors';

const PokemonCard = ({ pokemon, onEdit, onDelete, onFilterByType }) => {
  const { role } = useContext(AuthContext);
  const backgroundColor = typeColors[pokemon.tipo.split(', ')[0].toLowerCase()] || '#fff';

  return (
    <div className="pokemon-card" style={{ backgroundColor }}>
      <img src={pokemon.imagem} alt={pokemon.nome} className="pokemon-image" />
      <h2>{pokemon.nome}</h2>
      <p>Tipos: {pokemon.tipo}</p>
      <p>Habilidades: {pokemon.habilidade}</p>
      <p>Peso: {pokemon.peso}</p>

      <div className="button-container">
        {role === 'admin' && (
          <>
            <button style={{ backgroundColor }} onClick={() => onEdit(pokemon.id)}>Editar</button>
            <button style={{ backgroundColor }} onClick={() => onDelete(pokemon.id)}>Excluir</button>
          </>
        )}
        <button
          className="filter-button"
          style={{ backgroundColor }}
          onClick={() => onFilterByType(pokemon.tipo.split(', ')[0])}
        >
          Filtrar por {pokemon.tipo.split(', ')[0]}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
