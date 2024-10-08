const express = require('express');
const pokemonApi = require('../api/pokemon');
const authMiddleware = require('../Middleware/auth');
 
const router = express.Router();
 
router.post('/',authMiddleware(['admin']),pokemonApi.criarPokemon);
router.put('/:id',authMiddleware(['admin']), pokemonApi.alterarPokemon);
router.delete('/:id',authMiddleware(['admin']), pokemonApi.deletarPokemon);
router.get('/',authMiddleware(), pokemonApi.listarPokemons);
router.get('/:id',authMiddleware(), pokemonApi.buscarPokemonPorId);
 
module.exports = router;