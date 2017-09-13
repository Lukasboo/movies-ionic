import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MoviesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoviesProvider {

  baseApiPath = "https://api.themoviedb.org/3";
  imageBaseApiPath = "https://image.tmdb.org/t/p/w500/";

  constructor(public http: Http) {
    console.log('Hello MoviesProvider Provider');
  }
  
  getGenresMovies(){
    return this.http.get(this.baseApiPath + "/genre/movie/list?api_key=API_KEY_HERE&language=pt-BR");
  }

  getLatestMovies(){
    return this.http.get(this.baseApiPath + "/movie/popular?api_key=API_KEY_HERE&language=pt-BR");
  }

  getMoviesByGenre(idGenre: number){
    return this.http.get(this.baseApiPath + "/genre/" + idGenre + "/movies?api_key=API_KEY_HERE&language=pt-BR")
  }

  getMoviesById(idMovie: number){
    return this.http.get(this.baseApiPath + "/movie/" + idMovie + "?api_key=API_KEY_HERE&language=pt-BR")
  }
}
