import React, { useEffect, useState } from 'react';

// Mapeamento de tipos em inglês para português
const typeTranslations = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  grass: "Grama",
  electric: "Elétrico",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Venenoso",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Metálico",
  fairy: "Fada",
};

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState('');

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
    };
  };

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=500')
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

  return (
    <div>
      <h1>Pokédex</h1>

      <input
        type="text"
        placeholder="Pesquisar Pokémon..."
        value={search}
        onChange={handleSearch}
      />

      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>Tipos: {pokemon.types}</p>
            <p>Habilidades: {pokemon.abilities}</p> {/* Exibe as habilidades */}
          </div>
        ))}
      </div>

      <style jsx>{`
        .pokemon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .pokemon-card {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
        }

        img {
          width: 100px;
          height: 100px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};

export default PokemonList;
