const express = require('express');
const router = express.Router();

const pokemonData = require('../data/pokedex');
const typeData = require('../data/types');
const skillData = require('../data/skills');

router.get('/', (req, res) => {
  res.send('api root');
});

router.get('/pokemons', (req, res) => {
  console.log('get pokemons');
  res.status(200).json(pokemonData);
})

router.get('/pokemons/:pokemon_id', (req, res) => {
  console.log('get pokemon', req.params.pokemon_id);
  // find pokemon
  var pokemonById = pokemonData.find(pokemon => {
    return (pokemon.id == req.params.pokemon_id);
  })
  // return data
  if (pokemonById) {
    res.status(200).json(pokemonById);
  }
  else {
    res.status(404).send("Pokemon with id " + req.params.pokemon_id + " not found");
  }
})

router.get('/types', (req, res) => {
  console.log('get types');
  res.status(200).json(typeData);
})

router.get('/skills', (req, res) => {
  console.log('get skills');
  res.status(200).json(skillData);
})

router.get('*', (req, res) => {
  res.status(404).send("this api root does not exist");
});

module.exports = router;
