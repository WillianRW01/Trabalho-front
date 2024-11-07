import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import PokemonCard from '../../components/PokemonCard/PokemonCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import { alterarPokemon, listarPokemons, deletarPokemon } from '../../api/pokemon.jsx';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await listarPokemons();
      setPokemons(data);
    };
    fetchPokemons();
  }, []);

  const handleDeletePokemon = async (id) => {
    try {
      await deletarPokemon(id);
      setPokemons((prevPokemons) => prevPokemons.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Erro ao excluir Pokémon:', error);
    }
  };

  return (
    <div>
      <center>
        <h1>Pokédex</h1>
        <Link to="/pokemon/new">
          <button>Criar Pokémon</button>
        </Link>
      </center>
      <SearchBar search={search} handleSearch={(e) => setSearch(e.target.value)} />
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onEdit={() => {
              window.location.href = `/pokemon/${pokemon.id}`;
            }}
            onDelete={handleDeletePokemon}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
