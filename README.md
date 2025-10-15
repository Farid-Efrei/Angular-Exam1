# AngularQuiz

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.17.

## Migration History

- **Angular 16.1.7** → **Angular 19.2.17** (Migration completed successfully)
- **TypeScript**: 5.8.3 (compatible with Angular 19)
- **RxJS**: 7.8.2
- **Zone.js**: 0.15.1

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Objectif: Catégories avec lot de questions
Nouvelle PAGE qui affiche TOUTES les Cat. sosu forme de CARTES.
CARTES CAT -> Qst Cat choisie
Champ de recherche pour filtrer les cat. (à la validation seulement).
Bouton recherche + Reset. (X)
Afficher le NOM de la CAT sur la PAGE DE QST.
=> ID de la CAT en ROUTE (:id)
CAT récupérées dans la BDD (JSON-Server) -> ajouter CAT + QST.

New COMP -> Cat pr la Liste des CAT
Input -> Props Parent -> ENFT Cat CARD
NEW SCE -> CATSCE
Route: ?/:cat.id (route)
HttpClient : req
TDF: Forms
BDD: localhost:3000/categories
