import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import PokemonCard from '../../components/PokemonCard/PokemonCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import { listarPokemons, deletarPokemon } from '../../api/pokemon.jsx';
import { AuthContext } from '../../auth/Context'; 

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

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

  const filteredPokemons = pokemons.filter((pokemon) => 
    pokemon.nome.toLowerCase().includes(search.toLowerCase()) &&
    (typeFilter === '' || pokemon.tipo.includes(typeFilter))
  );

  const handleFilterByType = (type) => {
    setTypeFilter(typeFilter === type ? '' : type);
  };

  return (
    <div>
      <center>
        <h1>Pokédex</h1>
        {role === 'admin' && (
          <Link to="/pokemon/new">
            <button>Criar Pokémon</button>
          </Link>
        )}
      </center>

      <SearchBar search={search} handleSearch={(e) => setSearch(e.target.value)} />

      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onEdit={role === 'admin' ? () => handleEditPokemon(pokemon.id) : null}
            onDelete={role === 'admin' ? handleDeletePokemon : null}
            onFilterByType={handleFilterByType}
          />
        ))}
      </div>
    </div>
  );
};


export default PokemonList;
