import { Component, OnInit } from '@angular/core';
import { PokemonListService } from '../pokemon-list.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  // where we'll store all the pokemons at the beginning (cache)
  allPokemons: any = [];
  // where we'll store the pokemons displayed
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
  selectedFilterType: any;
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

  // chain requests to be sure we have the Skills & Types data before the Pokemons data
  getAllData() {
    this.loadingData = true;
    this.pokemonListService.getPokemonSkills().subscribe(
      pokemonSkills => {
        // console.log('component pokemonSkills', pokemonSkills);
        this.pokemonSkills = pokemonSkills;

        this.pokemonListService.getPokemonTypes().subscribe(
          pokemonTypes => {
            // console.log('component pokemonTypes', pokemonTypes);
            this.pokemonTypes = pokemonTypes;

            this.pokemonListService.getPokemons().subscribe(
              pokemons => {
                // console.log('component pokemons', pokemons);

                // add field selected
                // replace pokemon Chinese Types by English Types (store in pokemon.etype)
                pokemons.forEach(function(pok) {
                  pok.selected = false;
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
      if (orderFieldSplit.length == 2) {
        this.pokemons.sort(function(a, b) {
          return parseInt(b.id) - parseInt(a.id);
          // return (parseInt(b[orderFieldSplit[1]]) - parseInt(a[orderFieldSplit[1]]));
        });
      }
      // ASC
      else {
        this.pokemons.sort(function(a, b) {
          return parseInt(a.id) - parseInt(b.id);
          // return (parseInt(a[orderFieldSplit[0]]) - parseInt(b[orderFieldSplit[0]]));
        });
      }
    }

    // sorting by ename
    else if (orderFieldSplit[orderFieldSplit.length-1] == "ename") {
      // DESC
      if (orderFieldSplit.length == 2) {
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
      if (orderFieldSplit.length == 2) {
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

  filterPokemons(_filterType) {

    let _searchValue = this.searchValue;

    // init pokemons
    this.pokemons = this.allPokemons;

    // sort pokemons
    this.sortPokemons();

    // filter pokemons by _searchValue
    this.pokemons = this.pokemons.filter(function(pokemon) {
      return pokemon.ename.toLowerCase().includes(_searchValue.toLowerCase());
    });

    // filter pokemons by _filterType
    if (_filterType) {
      this.pokemons = this.pokemons.filter(function(pokemon) {
        return (pokemon.etype.indexOf(_filterType.ename) > -1);
      });
    }

  };

  searchPokemons(_searchValue) {

    let _selectedFilterType = this.selectedFilterType;

    // init pokemons
    this.pokemons = this.allPokemons;

    // sort pokemons
    this.sortPokemons();

    // filter pokemons by _filterType
    if (this.selectedFilterType) {
      this.pokemons = this.pokemons.filter(function(pokemon) {
        return (pokemon.etype.indexOf(_selectedFilterType.ename) > -1);
      });
    }

    // filter pokemons by _searchValue
    this.pokemons = this.pokemons.filter(function(pokemon) {
      return pokemon.ename.toLowerCase().includes(_searchValue.toLowerCase());
    });

  }


}
