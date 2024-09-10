import React, { useEffect, useState } from 'react';
import './styles.css'; 
import { typeTranslations, typeColors } from './typeMappings'; 

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]); 
  const [expandedPokemon, setExpandedPokemon] = useState(null); // Pokémon clicado para expandir

  const fetchPokemonDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return {
      name: data.name,
      image: data.sprites.front_default,
      types: data.types
        .map((typeInfo) => typeTranslations[typeInfo.type.name] || typeInfo.type.name)
        .join(', '),
      abilities: data.abilities
        .map((abilityInfo) => abilityInfo.ability.name.replace('-', ' '))
        .join(', '),
      height: data.height,
      weight: data.weight,
      typeArray: data.types.map((typeInfo) => typeTranslations[typeInfo.type.name] || typeInfo.type.name) 
    };
  };

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=999')
      .then((response) => response.json())
      .then(async (data) => {
        const detailedPokemons = await Promise.all(
          data.results.map((pokemon) => fetchPokemonDetails(pokemon.url))
        );
        setPokemons(detailedPokemons);
        setFilteredPokemons(detailedPokemons);
      })
      .catch((error) => console.error('Erro ao buscar os Pokémons:', error));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  const toggleFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.name === pokemon.name)) {
        return prevFavorites.filter((fav) => fav.name !== pokemon.name); // Desfavoritar
      } else {
        return [pokemon, ...prevFavorites]; // Favoritar e mover para o topo
      }
    });
  };

  const getBackgroundColor = (types) => {
    const mainType = types[0]; 
    return typeColors[mainType] || '#FFF'; 
  };

  // Função para expandir detalhes do Pokémon ao clicar
  const expandPokemon = (pokemon) => {
    setExpandedPokemon(expandedPokemon?.name === pokemon.name ? null : pokemon);
  };

  return (
    <div>
      <h1>Pokédex</h1>

      <input
        type="text"
        placeholder="Pesquisar Pokémon..."
        value={search}
        onChange={handleSearch}
      />

      {favorites.length > 0 && (
        <div>
          <h2>Pokémon Favoritos</h2>
          <div className="pokemon-grid">
            {favorites.map((pokemon, index) => (
              <div 
                key={index} 
                className={`pokemon-card ${expandedPokemon?.name === pokemon.name ? 'expanded' : ''}`} // Adiciona a classe 'expanded' se o Pokémon estiver expandido
                style={{ backgroundColor: getBackgroundColor(pokemon.typeArray) }} 
                onClick={() => expandPokemon(pokemon)} // Expande ao clicar
              >
                <img src={pokemon.image} alt={pokemon.name} />
                <div>
                  <h3>{pokemon.name}</h3>
                  {expandedPokemon?.name === pokemon.name && ( // Se expandido, mostra detalhes
                    <div>
                      <p>Tipos: {pokemon.types}</p>
                      <p>Habilidades: {pokemon.abilities}</p>
                      <p>Altura: {pokemon.height}</p>
                      <p>Peso: {pokemon.weight}</p>
                      <button
                        className="favorite-button"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          toggleFavorite(pokemon);
                        }}
                        style={{ backgroundColor: 'red' }}
                      >
                        Desfavoritar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pokemon-grid">
        {filteredPokemons
          .filter((pokemon) => !favorites.some((fav) => fav.name === pokemon.name)) 
          .map((pokemon, index) => (
            <div 
              key={index} 
              className={`pokemon-card ${expandedPokemon?.name === pokemon.name ? 'expanded' : ''}`} // Adiciona a classe 'expanded' se o Pokémon estiver expandido
              style={{ backgroundColor: getBackgroundColor(pokemon.typeArray) }} 
              onClick={() => expandPokemon(pokemon)} // Expande ao clicar
            >
              <img src={pokemon.image} alt={pokemon.name} />
              <div>
                <h3>{pokemon.name}</h3>
                {expandedPokemon?.name === pokemon.name && ( // Se expandido, mostra detalhes
                  <div>
                    <p>Tipos: {pokemon.types}</p>
                    <p>Habilidades: {pokemon.abilities}</p>
                    <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>
                    <button
                      className="favorite-button"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        toggleFavorite(pokemon);
                      }}
                      style={{ backgroundColor: favorites.some((fav) => fav.name === pokemon.name) ? 'red' : '#ffcc00' }}
                    >
                      {favorites.some((fav) => fav.name === pokemon.name) ? 'Desfavoritar' : 'Favoritar'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PokemonList;
