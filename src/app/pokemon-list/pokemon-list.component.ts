import { Component, OnInit } from '@angular/core';
import { PokemonListService } from '../pokemon-list.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: any = [];
  pokemonSkills: any = [];
  pokemonTypes: any = [];
  errorMessage: string;

  constructor(private pokemonListService: PokemonListService) { }

  ngOnInit() {
    console.log('pokemon component');
    this.getPokemons();
    this.getPokemonSkills();
    this.getPokemonTypes();
  }

  getPokemons() {
    // Retrieve pokemons from the API
    this.pokemonListService.getPokemons().subscribe(
      pokemons => this.pokemons = pokemons,
      error =>  this.errorMessage = <any>error
    );
    /* TODO:
    - add url field "/images/thm/{{pokemon.id}}{{pokemon.ename}}.png" or "/images/thm/{{pokemon.id}}{{pokemon.flatName}}.png"
    - replace types with english
    */
  }

  getPokemonSkills() {
    // Retrieve pokemons from the API
    this.pokemonListService.getPokemonSkills().subscribe(
      pokemonSkills => this.pokemonSkills = pokemonSkills,
      error =>  this.errorMessage = <any>error
    );
  }

  getPokemonTypes() {
    // Retrieve pokemons from the API
    this.pokemonListService.getPokemonTypes().subscribe(
      pokemonTypes => this.pokemonTypes = pokemonTypes,
      error =>  this.errorMessage = <any>error
    );
  }

}
