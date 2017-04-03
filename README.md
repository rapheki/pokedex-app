# PokedexApp

Display all the 721 Pokemons in a table. Clicking on a Pokemon gives additional details.


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


## Running unit tests (todo)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Running end-to-end tests (todo)

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.


## Built with

- Angular 4
- Node.JS
- Bootstrap


## Architecture

- The data (pokedex, skills, types) is stored in `server/data`
- The images (img, spr, thm) are stored in `public/images`
- The Angular app loads the data on init, and displays it in a table
