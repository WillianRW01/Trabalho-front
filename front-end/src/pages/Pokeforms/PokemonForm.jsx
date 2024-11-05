import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { criarPokemon, alterarPokemon, listarPokemonPorId } from '../../api/pokemon.jsx';
import './styles.css'; 

const PokemonForm = () => {
  const { id } = useParams(); 
  
  const [pokemon, setPokemon] = useState({
    nome: '',
    tipo: '',
    habilidade: '',
    peso: '',
  });

  useEffect(() => {
    const buscarPokemon = async () => {
      if (id) {
        const data = await listarPokemonPorId(id);
        setPokemon(data);
      }
    };
    buscarPokemon();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemon((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await alterarPokemon(id, pokemon);
        alert('Pokémon editado com sucesso!');
      } else {
        await criarPokemon(pokemon);
        alert('Pokémon criado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar Pokémon:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Editar Pokémon' : 'Criar Pokémon'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={pokemon.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          name="tipo"
          value={pokemon.tipo}
          onChange={handleChange}
          placeholder="Tipos (separe com vírgula)"
          required
        />
        <input
          type="text"
          name="habilidade"
          value={pokemon.habilidade}
          onChange={handleChange}
          placeholder="Habilidades (separe com vírgula)"
          required
        />
        <input
          type="number"
          name="altura"
          value={pokemon.altura || ''}
          onChange={handleChange}
          placeholder="Altura"
          required
        />
        <input
          type="number"
          name="peso"
          value={pokemon.peso}
          onChange={handleChange}
          placeholder="Peso"
          required
        />
        <input
          type="text"
          name="imagem"
          value={pokemon.imagem || ''}
          onChange={handleChange}
          placeholder="URL da Imagem"
          required
        />
        <button type="submit">{id ? 'Salvar' : 'Criar'}</button>
      </form>
    </div>
  );
};

export default PokemonForm;
