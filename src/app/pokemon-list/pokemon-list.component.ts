import { Component, OnInit } from '@angular/core';
import { PokemonListService } from '../pokemon-list.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: any = [];
  pokemonSkills: any = [];
  pokemonTypes: any = [];
  loadingData: boolean = false;
  errorMessage: string;

  constructor(private pokemonListService: PokemonListService) { }

  ngOnInit() {
    console.log('pokemon component');
    // this.getPokemons();
    // this.getPokemonSkills();
    // this.getPokemonTypes();
    this.getAllData();
  }

  // Retrieve pokemons from the API
  getPokemons() {
    this.pokemonListService.getPokemons().subscribe(
      pokemons => this.pokemons = pokemons,
      error => this.errorMessage = <any>error
    );
  }

  // Retrieve pokemon skills from the API
  getPokemonSkills() {
    this.pokemonListService.getPokemonSkills().subscribe(
      pokemonSkills => this.pokemonSkills = pokemonSkills,
      error => this.errorMessage = <any>error
    );
  }

  // Retrieve pokemon types from the API
  getPokemonTypes() {
    this.pokemonListService.getPokemonTypes().subscribe(
      pokemonTypes => this.pokemonTypes = pokemonTypes,
      error => this.errorMessage = <any>error
    );
  }

  // getAllData() {
  //   Observable.forkJoin([
  //     this.pokemonListService.getPokemons(),
  //     this.pokemonListService.getPokemonSkills(),
  //     this.pokemonListService.getPokemonTypes()
  //   ]).subscribe(
  //     t => {
  //       this.pokemons = t[0];
  //       this.pokemonSkills = t[1];
  //       this.pokemonTypes = t[2];
  //     }
  //   );
  // }

  getAllData() {
    this.loadingData = true;
    this.pokemonListService.getPokemonSkills().subscribe(
      pokemonSkills => {
        console.log('component pokemonSkills', pokemonSkills, this.loadingData);
        this.pokemonSkills = pokemonSkills;

        this.pokemonListService.getPokemonTypes().subscribe(
          pokemonTypes => {
            console.log('component pokemonTypes', pokemonTypes, this.loadingData);
            this.pokemonTypes = pokemonTypes;

            this.pokemonListService.getPokemons().subscribe(
              pokemons => {
                console.log('component pokemons', pokemons, this.loadingData);
                // replace pokemon Chinese Types by English Types (store in pokemon.etype)
                pokemons.forEach(function(pok) {
                  pok.etype = [];
                  pok.type.forEach(function(ctype) {
                    pokemonTypes.find(function(type) {
                      if (type.cname == ctype) {
                        pok.etype.push(type.ename);
                        return true;
                      }
                    })
                  });
                })
                this.pokemons = pokemons;
                this.loadingData = false;
              }
            );

          }
        );

      }
    );
  }

}
