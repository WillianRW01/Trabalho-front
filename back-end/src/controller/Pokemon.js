const Pokemon = require('../model/pokemon');

class PokemonController {
  async criarPokemon(nome, tipo, habilidade, peso, imagem) {
    if (!nome || !tipo || !habilidade || !peso) {
      throw new Error('Todos os campos (nome, tipo, habilidade, peso) são obrigatórios');
    }
  
    const novoPokemon = await Pokemon.create({ nome, tipo, habilidade, peso, imagem });
    return novoPokemon;
  }
  async buscarPorId(id) {

    if (!id) {
      throw new Error('ID é obrigatório');
    }
  
    
    let pokemon = await Pokemon.findByPk(id);
   
  
    if (!pokemon) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }
      
      const data = await response.json();
  
      pokemon = await Pokemon.create({
        nome: data.name, 
        tipo: data.types.map(t => t.type.name).join(', '), 
        habilidade: data.abilities.map(a => a.ability.name).join(', '), 
        peso: data.weight,
        imagem: data.sprites.front_default,
      });
    }
  
 
    return pokemon;
  }
  
  async listarPokemons(page = 1) {
    const limit = 35;
    const offset = (page - 1) * limit;
    const { count, rows: pokemons } = await Pokemon.findAndCountAll({ limit, offset });

    if (pokemons.length === 0) {
      let hasMore = true;
      let currentPage = 3;

      while (hasMore) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * limit}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar Pokémons da API');
        }

        const data = await response.json();
        if (!data.next || currentPage >=3) {
          hasMore = false;
        }

        for (const poke of data.results) {
          const pokemonDetails = await fetch(poke.url).then(res => res.json());

          await Pokemon.create({
            nome: pokemonDetails.nome,
            tipo: pokemonDetails.tipo.map(t => t.type.name).join(', '),
            habilidade: pokemonDetails.habilidade.map(a => a.ability.name).join(', '),
            peso: pokemonDetails.imagem,
            imagem: pokemonDetails.sprites.front_default,
          });
        }

        currentPage++;
      }
    }

    return pokemons;
  }

  async alterarPokemon(id, nome, tipo, habilidade, peso) {
    if (!id || !nome || !tipo || !habilidade || !peso) {
      throw new Error('ID, nome, tipo, habilidade e peso são obrigatórios');
    }

    const pokemon = await this.buscarPorId(id);
    pokemon.nome = nome;
    pokemon.tipo = tipo;
    pokemon.habilidade = habilidade;
    pokemon.peso = peso;
    await pokemon.save();

    return { message: 'Pokémon alterado com sucesso' };
  }

  async deletarPokemon(id) {
    if (!id) {
      throw new Error('ID é obrigatório');
    }

    const pokemon = await this.buscarPorId(id);
    await pokemon.destroy();

    return { message: 'Pokémon deletado com sucesso' };
  }
}

module.exports = new PokemonController();
