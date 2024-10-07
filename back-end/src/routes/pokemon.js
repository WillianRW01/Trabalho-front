const express = require('express');
const pokemonApi = require('../api/pokemon');
const authMiddleware = require('../Middleware/auth');
 
const router = express.Router();
 
router.post('/pokemons',authMiddleware(['admin']),pokemonApi.criarPokemon);
router.put('/pokemons/:id',authMiddleware(['admin']), pokemonApi.alterarPokemon);
router.delete('/pokemons/:id',authMiddleware(['admin']), pokemonApi.deletarPokemon);
router.get('/pokemons',authMiddleware(), pokemonApi.listarPokemons);
router.get('/pokemons/:id',authMiddleware(), pokemonApi.buscarPokemonPorId);
 
module.exports = router;