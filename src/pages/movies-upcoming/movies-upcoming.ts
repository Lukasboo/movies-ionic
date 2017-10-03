import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviedetailPage } from '../moviedetail/moviedetail';
import { MoviesProvider } from '../../providers/movies/movies';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the MoviesUpcomingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movies-upcoming',
  templateUrl: 'movies-upcoming.html',
})
export class MoviesUpcomingPage {

  public movies_list: Observable<any>;
  parameter1: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private moviesProvider: MoviesProvider
  ) {
  }

  ionViewDidLoad() {
      this.getMoviesUpcoming();
  }

  onSelect(movies): void {
    this.navCtrl.push(MoviedetailPage, {
      param1: movies.id
    });
  }

  async getMoviesUpcoming() {
    //this.parameter1 = this.navParams.get('param1');
    this.movies_list = this.moviesProvider.getMoviesUpcoming()
      .do((response) => console.log(response.json()))
      .map((response) => response.json())
      .map((response) => response.results);
  }

}
