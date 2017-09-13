import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { MoviedetailPage } from '../moviedetail/moviedetail';
/**
 * Generated class for the MoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
  providers: [
    MoviesProvider
  ]
})
export class MoviesPage {

  public movies_list = new Array<any>();

  parameter1: number;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private moviesProvider: MoviesProvider,
  ) {
  }

  ionViewDidLoad() {
    this.parameter1 = this.navParams.get('param1'); 
    console.log(this.parameter1);
    console.log('ionViewDidLoad MoviesPage');
    this.moviesProvider.getMoviesByGenre(this.parameter1).subscribe(
      (data) => {
        const { results } = data.json();
        
        this.movies_list = results;
        console.log(data.json());
        console.log(results);
      }, error => {
        console.log("ERROOOOOO");
      }
    )
  }

  onSelect(movies): void {
    console.log(movies);
    this.navCtrl.push(MoviedetailPage, {
      param1: movies.id
    });
  }

}
