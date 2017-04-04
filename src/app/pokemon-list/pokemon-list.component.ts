import { Component, OnInit } from '@angular/core';
import { PokemonListService } from '../pokemon-list.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  allPokemons: any = [];
  pokemons: any = [];
  pokemonSkills: any = [];
  pokemonTypes: any = [];
  loadingData: boolean = false;
  errorMessage: string;
  // sort
  sortValues = [
    {name: "id (ASC)", value: "id"},
    {name: "id (DESC)", value: "-id"},
    {name: "ename (ASC)", value: "ename"},
    {name: "ename (DESC)", value: "-ename"},
    {name: "type (ASC)", value: "etype"},
    {name: "type (DESC)", value: "-etype"},
  ]
  selectedSortValue = this.sortValues[0];
  // filter

  // search
  searchValue: string = "";


  constructor(private pokemonListService: PokemonListService) { }

  ngOnInit() {
    console.log('pokemon component');
    // this.getPokemons();
    // this.getPokemonSkills();
    // this.getPokemonTypes();
    this.getAllData();
  };

  // Retrieve pokemons from the API
  getPokemons() {
    this.pokemonListService.getPokemons().subscribe(
      pokemons => this.pokemons = pokemons,
      error => this.errorMessage = <any>error
    );
  };

  // Retrieve pokemon skills from the API
  getPokemonSkills() {
    this.pokemonListService.getPokemonSkills().subscribe(
      pokemonSkills => this.pokemonSkills = pokemonSkills,
      error => this.errorMessage = <any>error
    );
  };

  // Retrieve pokemon types from the API
  getPokemonTypes() {
    this.pokemonListService.getPokemonTypes().subscribe(
      pokemonTypes => this.pokemonTypes = pokemonTypes,
      error => this.errorMessage = <any>error
    );
  };

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
                this.allPokemons = pokemons;
                this.pokemons = pokemons;
                this.loadingData = false;
              }
            );

          }
        );

      }
    );
  };

  sortPokemons() {

    // split sort value
    let orderFieldSplit = this.selectedSortValue.value.split('-');

    // sorting by id
    if (orderFieldSplit[orderFieldSplit.length-1] == "id") {

      // DESC
      if (orderFieldSplit[0] === '-') {
        this.pokemons.sort(function(a, b) {
          return (parseInt(a[orderFieldSplit[1]]) - parseInt(b[orderFieldSplit[1]]));
        });
      }
      // ASC
      else {
        this.pokemons.sort(function(a, b) {
          return (parseInt(b[orderFieldSplit[1]]) - parseInt(a[orderFieldSplit[1]]));
        });
      }
    }

    // sorting by ename
    else if (orderFieldSplit[orderFieldSplit.length-1] == "ename") {
      // DESC
      if (orderFieldSplit[0] === '-') {
        this.pokemons.sort(function(a, b) {
          if (a[orderFieldSplit[1]] < b[orderFieldSplit[1]]) return 1;
          if (a[orderFieldSplit[1]] > b[orderFieldSplit[1]]) return -1;
          return 0;
        });
      }
      // ASC
      else {
        this.pokemons.sort(function(a, b) {
          if (a[orderFieldSplit[0]] < b[orderFieldSplit[0]]) return -1;
          if (a[orderFieldSplit[0]] > b[orderFieldSplit[0]]) return 1;
          return 0;
        });
      }
    }

    // sorting by etype
    else if (orderFieldSplit[orderFieldSplit.length-1] == "etype") {
      // DESC
      if (orderFieldSplit[0] === '-') {
        this.pokemons.sort(function(a, b) {
          if (a[orderFieldSplit[1]][0] < b[orderFieldSplit[1]][0]) return 1;
          if (a[orderFieldSplit[1]][0] > b[orderFieldSplit[1]][0]) return -1;
          return 0;
        });
      }
      // ASC
      else {
        this.pokemons.sort(function(a, b) {
          if (a[orderFieldSplit[0]][0] < b[orderFieldSplit[0]][0]) return -1;
          if (a[orderFieldSplit[0]][0] > b[orderFieldSplit[0]][0]) return 1;
          return 0;
        });
      }
    }
  };

  searchPokemons(_searchValue) {

    // init pokemons
    this.pokemons = this.allPokemons;

    // sort pokemons
    this.sortPokemons();

    // filter pokemons
    this.pokemons = this.pokemons.filter(function(pokemon) {
      return pokemon.ename.toLowerCase().includes(_searchValue.toLowerCase());
    });

  }


}
