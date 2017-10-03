import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { MoviesProvider } from '../../providers/movies/movies';
import { MoviedetailPage } from '../moviedetail/moviedetail';

/**
 * Generated class for the LatestMoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-latest-movies',
  templateUrl: 'latest-movies.html',
})
export class LatestMoviesPage {

  public movies_list: Observable<any>;
  parameter1: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private moviesProvider: MoviesProvider
  ) {
  }

  ionViewDidLoad() {
      this.getLatestMovies();
  }

  onSelect(movies): void {
    this.navCtrl.push(MoviedetailPage, {
      param1: movies.id
    });
  }

  async getLatestMovies() {
    //this.parameter1 = this.navParams.get('param1');
    this.movies_list = this.moviesProvider.getLatestMovies()
      .do((response) => console.log(response.json()))
      .map((response) => response.json())
      .map((response) => response.results);
  }

}
