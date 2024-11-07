import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import PokemonCard from '../../components/PokemonCard/PokemonCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import { listarPokemons, deletarPokemon } from '../../api/pokemon.jsx';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); 

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

  const handleEditPokemon = (id) => {
    navigate(`/pokemon/edit/${id}`); 
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
        {pokemons
          .filter((pokemon) => pokemon.nome.toLowerCase().includes(search.toLowerCase()))
          .map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onEdit={() => handleEditPokemon(pokemon.id)} 
              onDelete={handleDeletePokemon}
            />
          ))}
      </div>
    </div>
  );
};

export default PokemonList;
