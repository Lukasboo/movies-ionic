import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SeriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeriesProvider {

  baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    console.log('Hello SeriesProvider Provider');
  }

  getSeries(){
    return this.http.get(this.baseApiPath + "/discover/tv?api_key=60471ecf5f288a61c69c6592c9d9e1cf&language=pt-BR");
  }

  getSeriesById(idSerie: number){
    return this.http.get(this.baseApiPath + "/tv/" + idSerie + "?api_key=60471ecf5f288a61c69c6592c9d9e1cf&language=pt-BR")
  }

}
