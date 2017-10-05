import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { MoviesPage } from '../movies/movies';

/**
 * Generated class for the GenresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-genres',
  templateUrl: 'genres.html',
})
export class GenresPage {

  public movies_list = new Array<any>();
  constructor(
    public navCtrl: NavController,
    private moviesProvider: MoviesProvider
  ) {
  }

  ionViewDidLoad() {
    this.getGenresMovies();
  }

  onSelect(movies): void {
    this.navCtrl.push(MoviesPage, {
      param1: movies.id
    });
    
  }

  getGenresMovies(){
    this.moviesProvider.getGenresMovies().subscribe(
      (data) => {
        const { genres } = data.json();
        this.movies_list = genres;
      }, error => {
        console.log("ERROOOOOO");
      }
    )
  }

}
