import { Component, OnInit, Input } from '@angular/core';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  // constructor() { }

  // inject the Parent Component to get access to the pokemonSkills list (not great but only way I found)
  constructor(private pokemonListComponent: PokemonListComponent) { }
  //   console.log(pokemonListComponent.pokemonSkills);
  //   // this.pokemonSkills = PokemonListComponent.pokemonSkills;
  // }

  @Input() pokemon: any;

  ngOnInit() {
  }

  getSkill(skillId) {
    return this.pokemonListComponent.pokemonSkills.find(function(skill) {
      return (skill.id == skillId);
    }).ename;

  }

}
