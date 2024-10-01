const controller = require('../controller/Pokemon');
 
class PokemonApi {
 
  async criarPokemon(req, res) {
    const { nome, tipo, habilidade, peso } = req.body;
 
    try {
      const pokemon = await controller.criarPokemon(nome, tipo, habilidade, peso);
      return res.status(201).send(pokemon);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
 
  async alterarPokemon(req, res) {
    const { id } = req.params;
    const { nome, tipo, habilidade, peso } = req.body;
 
    try {
      const pokemon = await controller.alterarPokemon(Number(id), nome, tipo, habilidade, peso);
      return res.status(200).send(pokemon);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
 
 
  async deletarPokemon(req, res) {
    const { id } = req.params;
 
    try {
      await controller.deletarPokemon(Number(id));
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
 
 
  async listarPokemons(req, res) {
    try {
      const pokemons = await controller.listarPokemons();
      return res.status(200).send(pokemons);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
 
 
  async buscarPokemonPorId(req, res) {
    const { id } = req.params;
 
    try {
      const pokemon = await controller.buscarPorId(Number(id));
      return res.status(200).send(pokemon);
    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
  }
}
 
module.exports = new PokemonApi();