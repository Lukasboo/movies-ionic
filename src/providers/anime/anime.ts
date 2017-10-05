import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AnimeProvider {

  apiUrl: String = 'localhost:3000/ani';

  constructor(public http: Http) {
    console.log('Hello AnimeProvider Provider');
  }

  getAnimes(){
    //return this.http.get("http://localhost:3000/ani");
    return this.http.get("https://kitsu.io/api/edge/anime");
  }

  getAnimeById(id){
    return this.http.get("https://kitsu.io/api/edge/anime/" + id);
  }

}
