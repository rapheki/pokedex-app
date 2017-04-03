import { TestBed, inject } from '@angular/core/testing';

import { PokemonListService } from './pokemon-list.service';

describe('PokemonListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonListService]
    });
  });

  it('should ...', inject([PokemonListService], (service: PokemonListService) => {
    expect(service).toBeTruthy();
  }));
});
