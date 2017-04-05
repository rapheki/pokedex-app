# PokedexApp

Display all the 721 Pokemons in a table. Clicking on a Pokemon gives additional details. You can sort by id/ename/type, filter by type, and search by ename. Some skills info in bonus.


## Run the app

Clone the repo
```
$ git clone https://github.com/raphodn/pokedex-app.git
$ cd pokedex-app
```

Install angular-cli
```
$ npm install -g angular-cli
```

Install dependencies
```
$ npm install
```

Run the app
```
$ ng build && node server.js
```

Open your browser
```
http://localhost:3000/
```


## Built with

- Angular 4
- Node.JS
- Bootstrap


## Architecture

- The data (pokedex, skills, types) is stored in `server/data`
- The images (img, spr, thm) are stored in `public/images`
- The Angular app loads the data on init, and displays it in cards
- 3 Components (AppComponent > PokemonListComponent > PokemonCardComponent) & 1 Service (PokemonListService)
