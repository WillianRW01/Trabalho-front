import React, { useEffect, useState } from 'react';
import './styles.css'; 
import { typeTranslations, typeColors } from './typeMappings'; 

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]); 
  const [selectedPokemon, setSelectedPokemon] = useState(null); 

  // Função para buscar detalhes de cada Pokémon
  const fetchPokemonDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return {
      name: data.name,
      image: data.sprites.front_default, // Imagem frontal do Pokémon
      types: data.types
        .map((typeInfo) => typeTranslations[typeInfo.type.name] || typeInfo.type.name)
        .join(', '), // Tipos do Pokémon traduzidos
      abilities: data.abilities
        .map((abilityInfo) => abilityInfo.ability.name.replace('-', ' ')) // Remover hífens nas habilidades
        .join(', '), // Junta as habilidades em uma string
      height: data.height, // Altura do Pokémon
      weight: data.weight, // Peso do Pokémon
      typeArray: data.types.map((typeInfo) => typeTranslations[typeInfo.type.name] || typeInfo.type.name) // Array de tipos
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

  // Função para alternar entre favorito e não favorito
  const toggleFavorite = (pokemon) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(pokemon)
        ? prevFavorites.filter((fav) => fav.name !== pokemon.name)
        : [...prevFavorites, pokemon]
    );
  };

  // Função para determinar a cor de fundo com base no primeiro tipo do Pokémon
  const getBackgroundColor = (types) => {
    const mainType = types[0]; // Usando o primeiro tipo como principal
    return typeColors[mainType] || '#FFF'; // Cor padrão se não houver cor associada
  };

  // Função para abrir o modal com detalhes do Pokémon
  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setSelectedPokemon(null);
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
                className="pokemon-card favorite"
                style={{ backgroundColor: getBackgroundColor(pokemon.typeArray) }} // Cor de fundo dinâmica
                onClick={() => openModal(pokemon)}
              >
                <img src={pokemon.image} alt={pokemon.name} />
                <h3>{pokemon.name}</h3>
                <p>Tipos: {pokemon.types}</p>
                <p>Habilidades: {pokemon.abilities}</p>
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
            ))}
          </div>
        </div>
      )}

     
      <div className="pokemon-grid">
        {filteredPokemons
          .filter((pokemon) => !favorites.includes(pokemon)) 
          .map((pokemon, index) => (
            <div 
              key={index} 
              className="pokemon-card"
              style={{ backgroundColor: getBackgroundColor(pokemon.typeArray) }} 
              onClick={() => openModal(pokemon)}
            >
              <img src={pokemon.image} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
              <p>Tipos: {pokemon.types}</p>
              <p>Habilidades: {pokemon.abilities}</p>
              <button
                className="favorite-button"
                onClick={(e) => {
                  e.stopPropagation(); 
                  toggleFavorite(pokemon);
                }}
              >
                Favoritar
              </button>
            </div>
          ))}
      </div>

    
      {selectedPokemon && (
        <div className="modal">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.image} alt={selectedPokemon.name} />
            <p>Tipos: {selectedPokemon.types}</p>
            <p>Habilidades: {selectedPokemon.abilities}</p>
            <p>Altura: {selectedPokemon.height}</p>
            <p>Peso: {selectedPokemon.weight}</p>
            <p>Regiões: {selectedPokemon.locations}</p> 
            <button
              className="favorite-button"
              onClick={() => toggleFavorite(selectedPokemon)}
              style={{ backgroundColor: favorites.includes(selectedPokemon) ? 'red' : '#ffcc00' }}
            >
              {favorites.includes(selectedPokemon) ? 'Desfavoritar' : 'Favoritar'}
            </button>
            <button className="close-button" onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
