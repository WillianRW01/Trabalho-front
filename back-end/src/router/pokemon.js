const express = require("express");
const {
  createPokemon,
  getAllPokemons,
  getPokemonById,
  updatePokemon,
  deletePokemon,
} = require("../controller/PokemonController");

const router = express.Router();

router.post("/pokemons", createPokemon);
router.get("/pokemons", getAllPokemons);
router.get("/pokemons/:id", getPokemonById);
router.put("/pokemons/:id", updatePokemon);
router.delete("/pokemons/:id", deletePokemon);

module.exports = router;
