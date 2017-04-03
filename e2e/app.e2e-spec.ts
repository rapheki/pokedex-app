import { PokedexAppPage } from './app.po';

describe('pokedex-app App', () => {
  let page: PokedexAppPage;

  beforeEach(() => {
    page = new PokedexAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
