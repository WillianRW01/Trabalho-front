const Pokemon = require("../model/pokemon");

const createPokemon = async (req, res) => {
  try {
    const { nome, tipo, habilidade, peso } = req.body;
    const newPokemon = await Pokemon.create({ nome, tipo, habilidade, peso });
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o Pokémon" });
  }
};

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os Pokémon" });
  }
};

const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findByPk(id);
    if (pokemon) {
      res.status(200).json(pokemon);
    } else {
      res.status(404).json({ error: "Pokémon não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o Pokémon" });
  }
};

const updatePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, tipo, habilidade, peso } = req.body;
    const pokemon = await Pokemon.findByPk(id);
    if (pokemon) {
      await pokemon.update({ nome, tipo, habilidade, peso });
      res.status(200).json(pokemon);
    } else {
      res.status(404).json({ error: "Pokémon não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o Pokémon" });
  }
};

const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findByPk(id);
    if (pokemon) {
      await pokemon.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Pokémon não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o Pokémon" });
  }
};

module.exports = {
  createPokemon,
  getAllPokemons,
  getPokemonById,
  updatePokemon,
  deletePokemon,
};
