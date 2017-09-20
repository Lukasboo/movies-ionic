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
  imageBaseApiPath = "https://image.tmdb.org/t/p/w300/";

  constructor(public http: Http) {}
  
  getGenresMovies(){
    return this.http.get(this.baseApiPath + "/genre/movie/list?api_key=60471ecf5f288a61c69c6592c9d9e1cf&language=pt-BR");
  }

  getLatestMovies(){
    return this.http.get(this.baseApiPath + "/movie/popular?api_key=60471ecf5f288a61c69c6592c9d9e1cf&language=pt-BR");
  }

  getMoviesByGenre(idGenre: number){
    return this.http.get(this.baseApiPath + "/genre/" + idGenre + "/movies?api_key=60471ecf5f288a61c69c6592c9d9e1cf&language=pt-BR")
  }

  getMoviesById(idMovie: number){
    return this.http.get(this.baseApiPath + "/movie/" + idMovie + "?api_key=60471ecf5f288a61c69c6592c9d9e1cf&language=pt-BR")
  }
}
