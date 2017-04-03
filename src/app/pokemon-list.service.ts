import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PokemonListService {

  private pokemonsUrl = 'api/pokemons';
  private skillsUrl = 'api/skills';
  private typesUrl = 'api/types';

  constructor(private http: Http) { }

  // Get all pokemons from the API
  getPokemons(): Observable<any[]> {
    return this.http.get(this.pokemonsUrl)
                    .map(res => res.json())
                    // .catch(console.log("error getPokemons"));
  }

  // getPokemon() {}

  // Get all pokemon skills from the API
  getPokemonSkills(): Observable<any[]> {
    return this.http.get(this.skillsUrl)
                    .map(res => res.json());
  }

  // Get all pokemon types from the API
  getPokemonTypes(): Observable<any[]> {
    return this.http.get(this.typesUrl)
                    .map(res => res.json());
  }

}
