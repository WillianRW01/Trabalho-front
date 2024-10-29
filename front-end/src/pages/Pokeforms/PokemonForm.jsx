import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { criarPokemon, alterarPokemon } from '../../api/pokemon.jsx';
import './styles.css'; // Importando o CSS

const PokemonForm = () => {
  const { id } = useParams(); // Para saber se estamos editando ou criando
  const history = useHistory();

  const [pokemon, setPokemon] = useState({
    name: '',
    types: [],
    abilities: [],
    height: 0,
    weight: 0,
    image: ''
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      if (id) {
        const data = await listarPokemonPorId(id);
        setPokemon(data);
      }
    };
    fetchPokemon();
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
      history.push('/'); // Redireciona para a página inicial após criar ou editar
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
          name="name"
          value={pokemon.name}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          name="types"
          value={pokemon.types.join(', ')}
          onChange={(e) => handleChange({ target: { name: 'types', value: e.target.value.split(', ') } })}
          placeholder="Tipos (separe com vírgula)"
          required
        />
        <input
          type="text"
          name="abilities"
          value={pokemon.abilities.join(', ')}
          onChange={(e) => handleChange({ target: { name: 'abilities', value: e.target.value.split(', ') } })}
          placeholder="Habilidades (separe com vírgula)"
          required
        />
        <input
          type="number"
          name="height"
          value={pokemon.height}
          onChange={handleChange}
          placeholder="Altura"
          required
        />
        <input
          type="number"
          name="weight"
          value={pokemon.weight}
          onChange={handleChange}
          placeholder="Peso"
          required
        />
        <input
          type="text"
          name="image"
          value={pokemon.image}
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
