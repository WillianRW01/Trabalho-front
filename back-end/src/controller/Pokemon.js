const Pokemon = require('../model/pokemon');
 
class PokemonController {
 
  async criarPokemon(nome, tipo, habilidade, peso) {
    if (!nome || !tipo || !habilidade || !peso) {
      throw new Error('Todos os campos (nome, tipo, habilidade, peso) são obrigatórios');
    }
   
    const novoPokemon = await Pokemon.create({ nome, tipo, habilidade, peso });
    return novoPokemon;
  }
 
 
  async buscarPorId(id) {
    if (!id) {
      throw new Error('ID é obrigatório');
    }
 
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) {
      throw new Error('Pokémon não encontrado');
    }
 
    return pokemon;
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
 
    console.log('Pokémon alterado com sucesso');
    return { message: 'Pokémon alterado com sucesso' };
  }
 
 
  async deletarPokemon(id) {
    if (!id) {
      throw new Error('ID é obrigatório');
    }
 
    const pokemon = await this.buscarPorId(id);
    await pokemon.destroy();
 
    console.log('Pokémon deletado com sucesso');
    return { message: 'Pokémon deletado com sucesso' };
  }
 
 
  async listarPokemons() {
    const pokemons = await Pokemon.findAll();
    console.log('Listando Pokémons');
    return pokemons;
  }
}
 
module.exports = new PokemonController();