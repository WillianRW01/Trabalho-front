const express = require('express');
const pokemonApi = require('../api/pokemon');
 
const router = express.Router();
 
router.post('/pokemons', pokemonApi.criarPokemon);
router.put('/pokemons/:id', pokemonApi.alterarPokemon);
router.delete('/pokemons/:id', pokemonApi.deletarPokemon);
router.get('/pokemons', pokemonApi.listarPokemons);
router.get('/pokemons/:id', pokemonApi.buscarPokemonPorId);
 
module.exports = router;