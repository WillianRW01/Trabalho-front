import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import PokemonCard from '../../components/PokemonCard/PokemonCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import { listarPokemons, deletarPokemon } from '../../api/pokemon.jsx';
import { AuthContext } from '../../auth/Context';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.nome.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPokemons = filteredPokemons.slice(startIndex, startIndex + itemsPerPage);

 

  return (
    <div>
      <center>
        <h1>Pokédex</h1>
      </center>
      <SearchBar search={search} handleSearch={(e) => setSearch(e.target.value)} />
      {role === 'admin' && (
        <div className="create-button-container">
          <Link to="/pokemon/new">
            <button className="create-button">Criar Pokémon</button>
          </Link>
        </div>
      )}
      <div className="pokemon-grid">
        {paginatedPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onEdit={role === 'admin' ? () => handleEditPokemon(pokemon.id) : null}
            onDelete={role === 'admin' ? handleDeletePokemon : null}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PokemonList;
