import React, { useEffect, useState } from 'react';
import './styles.css'; 
import PokemonCard from '../../components/PokemonCard/PokemonCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import FavoriteList from '../../components/FavoriteList/FavoriteList.jsx';
import { typeTranslations, typeColors } from '../../utils/typeMappings.js';
import { js } from '@eslint/js';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]); 
  const [expandedPokemon, setExpandedPokemon] = useState(null);

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
        return prevFavorites.filter((fav) => fav.name !== pokemon.name); 
      } else {
        return [pokemon, ...prevFavorites];
      }
    });
  };

  const getBackgroundColor = (types) => {
    const mainType = types[0]; 
    return typeColors[mainType] || '#FFF'; 
  };

  const expandPokemon = (pokemon) => {
    setExpandedPokemon(expandedPokemon?.name === pokemon.name ? null : pokemon);
  };

  const groupPokemonsByType = (pokemons) => {
    const grouped = {};
    pokemons.forEach((pokemon) => {
      const mainType = pokemon.typeArray[0]; 
      if (!grouped[mainType]) {
        grouped[mainType] = [];
      }
      grouped[mainType].push(pokemon);
    });
    return grouped;
  };

  const groupedPokemons = groupPokemonsByType(filteredPokemons);

  return (
    <div>
      <center>
      <h1>Pokédex</h1>
      </center>
      <SearchBar search={search} handleSearch={handleSearch} />

      {favorites.length > 0 && (
        <FavoriteList
          favorites={favorites}
          expandedPokemon={expandedPokemon}
          expandPokemon={expandPokemon}
          toggleFavorite={toggleFavorite}
          getBackgroundColor={getBackgroundColor}
        />
      )}

      {Object.keys(groupedPokemons).map((type) => (
        <div key={type}>
          <h2>{type}</h2> 
          <div className="pokemon-grid">
            {groupedPokemons[type].map((pokemon, index) => (
              <PokemonCard
                key={index}
                pokemon={pokemon}
                expandedPokemon={expandedPokemon}
                expandPokemon={expandPokemon}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                getBackgroundColor={getBackgroundColor}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
